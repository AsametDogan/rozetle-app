import { Request, Response } from "express";
import { IAssignment, IRequestWithUser, IUser } from "../interfaces";
import { AssignmentModel, BadgeModel, UserModel } from "../models";


const newAssign = async (req: IRequestWithUser, res: Response) => {
    try {
        const { description, receiverInfo, badgeId } = req.body;
        console.log(badgeId)
        const userId = req.user?._id;
        const userRole = req.user?.role;
        console.log("user role: " + userRole)
        console.log({ message: "newAssign user: ", data: req.user })
        if (!userId) {
            return res.status(401).json({ message: 'Yetkilendirme hatası: uid' });
        }

        const existingAssignment: IAssignment | null = await AssignmentModel.findOne({
            senderId: userId,
            receiverInfo,
            badgeId,
        });
        if (req.user?.email.includes(receiverInfo)) {
            return res.status(400).json({ message: 'Kendinize rozet atayamazsınız', success: false });

        }
        if (existingAssignment) {
            return res.status(400).json({ message: 'Bu rozeti zaten atadınız', success: false });
        }

        const badge = await BadgeModel.findById(badgeId)

        if (!badge) {
            return res.status(404).json({ message: 'Rozet Bulunamadı', success: false });
        }
        if (userRole == null) {
            return res.status(401).json({ message: 'Yetkilendirme hatası: user role', success: false });
        }
        if (!badge.attainerRoles.includes(userRole)) {
            return res.status(401).json({ message: 'Bu rozeti almaya yetkiniz yoktur', success: false });
        }
        if (badge.restCount <= 0) {
            if (badge.restCount != -999) {
                return res.status(400).json({ message: 'Rozet stoğu kalmamıştır', success: false });
            }
        }
        // restCount değerini azalt

        const assignment = new AssignmentModel({
            description,
            senderId: userId,
            receiverInfo,
            badgeId,
            assignDate: new Date(),
        });

        await assignment.save();
        if (badge.restCount != -999) {
            badge.restCount--;
            const updatedBadge = await BadgeModel.findByIdAndUpdate(
                badgeId,
                { $set: badge },
                { new: true }
            );

            if (!updatedBadge) {
                return res.status(500).json({ message: 'Rozet gönderilirken bir hata meydana geldi', success: false });
            }
        }

        res.status(201).json({ message: 'Rozet gönderildi', success: true, data: assignment._id, baseUrl: "https://www.rozetle.com/assign/" });
    } catch (error) {
        console.log({ message: 'Rozet gönderilirken bir hata oluştu', error: error })
        res.status(500).json({ message: 'Rozet gönderilirken bir hata oluştu', success: false });
    }
}

const getInfo = async (req: Request, res: Response) => {
    try {
        let infoData: any = []
        let allUsers: any = await UserModel.find().select("name surname email nickName phone email role")
        console.log(allUsers.length)

        if (allUsers.length > 0) {

            for (const user of allUsers) {
                const receivedBadges = await AssignmentModel.find({ receiverInfo: { $in: user.email } || user?.phone })
                const sentBadges = await AssignmentModel.find({ senderId: user._id })
                infoData.push({
                    ...user._doc,
                    receivedCount: receivedBadges.length,
                    sentCount: sentBadges.length
                })
            }
        }
        else {
            console.log("length else")
        }
        infoData = infoData.sort((a, b) => b.sentCount - a.sentCount);

        return res.status(200).json({ message: "Başarılı", data: infoData, success: true })
    } catch (error) {
        console.log({ location: getInfo, error })
        res.status(500).json({ message: 'Bir hata oluştu', success: false });
    }
}

const getAssignment = async (req: Request, res: Response) => {
    let { id } = req.params;
    console.log("getAssignment:   " + id)
    try {

        let assignment = await AssignmentModel.findById(id)
            .populate({
                populate: { path: "categoryId", model: "Category" },
                path: 'badgeId',
                model: 'Badge', // Badge model adı
            })
            .populate({
                path: 'senderId',
                model: 'User', // User model adı
                select: 'nickName name surname email profileImg',
            });
        if (!assignment) {
            return res.status(404).json({ data: null, message: "Rozetleme bulunamadı, linki kontrol edin", success: false });
        }
        try {
            const sender = await UserModel.findById(assignment.senderId)
            const receiver = await UserModel.findOne({ email: { $in: [assignment.receiverInfo] } })
            if (!sender) {
                res.status(500).json({ data: null, message: "Gönderici bilgisi bulunamadı, hatalı işlem", success: false })
            }
            if (receiver) {
                res.status(200).json({ data: { assignment: assignment, receiver: { nickName: receiver.nickName, name: receiver.name, surname: receiver.surname, email: assignment.receiverInfo, profileImg: receiver.profileImg } }, message: "İşlem Başarılı", success: true })
            }
            else {
                res.status(200).json({ data: { assignment: assignment, receiver: { email: assignment.receiverInfo } } })
            }
        } catch (error) {
            console.log({ message: "getAssignment-1", error })
            return res.status(500).json({ data: null, message: "Bilinmeyen bir hata meydana geldi, lütfen daha sonra tekrar deneyin", success: false })
        }
    } catch (error) {
        console.log({ message: "getAssignment-2", error })

        return res.status(500).json({ data: null, message: "Bilinmeyen bir hata meydana geldi, lütfen daha sonra tekrar deneyin", success: false })
    }
}

const deleteAssign = async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        let assignment = await AssignmentModel.findByIdAndDelete(id)
        res.status(200).json({ data: null, message: "Silme başarılı", success: true })
    } catch (error) {
        return res.status(500).json({ data: null, message: "Bilinmeyen bir hata meydana geldi, lütfen daha sonra tekrar deneyin", success: false })

    }
}

const getAllAssign = async (req: Request, res: Response) => {
    try {
        const assign = await AssignmentModel.find()
        res.status(200).json({ data: assign, message: "başarılı", success: true })
    } catch (error) {
        res.status(500).json({ message: 'Rozetler getirilirken bir hata oluştu', succes: false });

    }
}


const getMyReceived = async (req: IRequestWithUser, res: Response) => {
    const receiverEmail = req.user?.email;
    //const receiverPhone = req.user?.phone;
    if (!receiverEmail) {
        return res.status(401).json({ message: 'Alıcı iletişim adreslerini kontrol edin', succes: false });
    }

    try {
        const receivedBadges = await AssignmentModel.find({ receiverInfo: { $in: receiverEmail } })
            .populate({
                path: 'badgeId',
                model: 'Badge', // Badge model adı
                populate: { path: "categoryId", model: "Category" },
            })
            .populate({
                path: 'senderId',
                model: 'User', // User model adı
                select: 'nickName name surname email profileImg',
            });
        if (!receivedBadges) {
            return res.status(204).json({ message: 'Henüz hiç rozet almadınız', succes: false });
        }

        res.status(200).json({ data: receivedBadges, baseUrl: "https://www.rozetle.com/assign/", message: "İşlem Başarılı", succes: true });
    } catch (error) {
        console.log({ from: "getMyReceived", error })
        res.status(500).json({ message: 'Rozet bilgileri getirilirken bir hata oluştu', succes: false });
    }
}


const getMySent = async (req: IRequestWithUser, res: Response) => {
    const senderId = req.user?._id;
    if (!senderId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', succes: false });
    }

    try {
        // tüm göndermeleri rozet bilgilerini badgeId ye açarak çek
        let sentBadges = await AssignmentModel.find({ senderId })
            .populate({
                populate: { path: "categoryId", model: "Category" },
                path: 'badgeId',
                model: 'Badge', // Badge model adı
            })
        if (!sentBadges) {
            return res.status(204).json({ data: [], baseUrl: "https://www.rozetle.com/assign/", message: "Henüz hiç rozet göndermediniz", succes: true });
        }
        /*
         var sentBadgesWithReceiver: any[] = [];

        
        try {
            //her rozet gönderimi için user bilgisini çekmeye çalış, çekilemeyenler için receiverInfo içinde yalnızca alıcı emaili barındırsın
                 sentBadges.forEach(async (data) => {
                     const receiver = await UserModel.findOne({ email: { $in: data.receiverInfo } })
                     if (receiver) {
                         console.log("kullanıcı var:" + receiver)
                         sentBadgesWithReceiver.push({
                             ...data,
                             receiverInfo: {
                                 nickName: receiver.nickName,
                                 name: receiver.name,
                                 surname: receiver.surname,
                                 email: data.receiverInfo,
                                 profileImg: receiver.profileImg
                             }
                         })
                     }
                     else {
                         console.log("kullanıcı yok:" + receiver)
                         sentBadgesWithReceiver.push({ ...data, receiverInfo: { email: data.receiverInfo } })
                     }
                     console.log(sentBadgesWithReceiver)
                 }) 
        } catch (error) {
            return res.status(500).json({ message: 'Rozet alıcı bilgisini çekerken beklenmeyen bir hata meydana geldi', succes: false });
        } 
        */

        res.status(200).json({ message: "İşlem başarılı", data: sentBadges, baseUrl: "https://www.rozetle.com/assign/", success: true })
    } catch (error) {
        res.status(500).json({ message: 'Rozet bilgileri getirilirken bir hata oluştu', succes: false });
    }
}

/* 
const deleteAll = async (req: Request, res: Response) => {
    try {
        const result = await AssignmentModel.deleteMany({});
        res.json({ message: `${result.deletedCount} assignments deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
} */



export { getMyReceived, getMySent, newAssign, getAssignment, deleteAssign, getAllAssign, getInfo }