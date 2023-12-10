import excel from 'exceljs';
import { Request, Response, response } from "express";
import { AssignmentModel, BadgeModel, NotifyModel, NotifyTokenModel, UserModel, VerificationModel } from "../models";
import { IAssignment, IBadge, IRequestWithUser } from "../interfaces";
import { mailSender } from "../helpers/mail.sender.helper";
import { isValidEmail } from "../helpers/validation.helper";
import { shuffleArray, trimPhone } from "../helpers/algorithms.helper";




const sendBadges = async (req: IRequestWithUser, res: Response) => {
    const { receiversData, badgeId, description, mailSubject, mailText } = req.body
    let assignment
    if (!receiversData || !Array.isArray(receiversData)) return res.status(400).send({ message: "emailler gelmedi", data: receiversData, success: false })

    try {
        const badge = await BadgeModel.findById(badgeId)
        if (!badge) {
            return res.status(404).send({ message: "Rozet bulunamadı", success: false })
        }

        for (const receiver of receiversData) { //her alıcı bilgisi için
            assignment = await AssignmentModel.findOne({
                senderId: "userId",
                receiverInfo: receiver,
                badgeId,
            });

            if (!assignment) {
                if (badge.restCount <= 0) {//rozet stoğu kontrolü
                    if (badge.restCount != -999) {
                        return res.status(400).json({ message: 'Rozet stoğu kalmamıştır', success: false });
                    }
                }

                //atama oluştur
                assignment = new AssignmentModel({
                    description,
                    senderId: "userId",
                    receiverInfo: receiver,
                    badgeId,
                    assignDate: new Date(),
                });
                await assignment.save();

                if (badge.restCount != -999) { // rozet sınırsız değilse azalt stok
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

            }
            if (isValidEmail(receiver)) {
                await mailSender(receiver, mailSubject, mailText + "\nBu link ile rozeti görüntüleyin ve hemen siz de uygulamayı indirerek rozetlemeye başlayın\n\n" + `https://www.rozetle.com/assign/${assignment._id}`)
            }

            res.status(201).json({ message: 'Rozet gönderildi', success: true, data: null });

        }
    } catch (error) {
        console.log("sendBadge admin: " + error)
        return res.status(500).json({ message: 'Rozet gönderilirken bir hata meydana geldi', success: false });

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

const getAllAssign = async (req: Request, res: Response) => {
    try {
        const assign = await AssignmentModel.find()
        res.status(200).json({ data: assign, message: "başarılı", success: true })
    } catch (error) {
        res.status(500).json({ message: 'Rozetler getirilirken bir hata oluştu', succes: false });

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

const uploadImgLink = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ link: `https://rozetle.com:5001/api/image/img/${req.file?.filename}` })
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}


const createBadge = async (req: IRequestWithUser, res: Response) => {

    try {
        const { title, categoryId, totalCount, price, attainerRoles } = req.body;
        const newBadge = new BadgeModel({
            title,
            badgeImg: `https://rozetle.com:5001/api/image/badge/${req.file?.filename}`,
            categoryId,
            totalCount,
            restCount: totalCount,
            price,
            attainerRoles: attainerRoles.split(",")
        });
        await newBadge.save();
        res.status(201).json({ message: 'Rozet oluşturma başarılı', success: true });
    } catch (error) {
        res.status(500).json({ message: `Rozet oluşturulurken bir hata oluştu: ${error}`, success: false });
    }
}

const deleteBadge = async (req: IRequestWithUser, res: Response) => {

    try {
        const { badgeId } = req.body
        const deletedBadge: IBadge | null = await BadgeModel.findByIdAndDelete(badgeId);
        if (!deletedBadge) {
            return res.status(404).json({ message: 'Rozet bulunamadı', success: false });
        }
        res.status(204).json({ message: 'Rozet başarıyla silindi', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Rozet silinirken bir hata oluştu', success: false });
    }
}

const updateBadge = async (req: IRequestWithUser, res: Response) => {
    const { title, categoryId, totalCount, restCount, price, attainerRoles, badgeId } = req.body;

    const updateFields: any = {};

    // Check each variable and add it to the update object if it's not null
    if (title !== null && title !== undefined) {
        updateFields.title = title;
    }

    if (categoryId !== null && categoryId !== undefined) {
        updateFields.categoryId = categoryId;
    }

    if (totalCount !== null && totalCount !== undefined) {
        updateFields.totalCount = totalCount;
    }

    if (price !== null && price !== undefined) {
        updateFields.price = price;
    }
    if (restCount !== null && restCount !== undefined) {
        updateFields.restCount = restCount;
    }

    if (attainerRoles !== null && attainerRoles !== undefined) {
        updateFields.attainerRoles = attainerRoles.split(",");
    }

    // If there are no fields to update, return an error response
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No valid fields to update', success: false });
    }
    try {
        // Use $set to only update the specified fields in the document
        const updatedBadge = await BadgeModel.findByIdAndUpdate(
            badgeId,
            {
                $set: updateFields,
            },
            { new: true }
        );

        if (!updatedBadge) {
            return res.status(404).json({ message: 'Rozet bulunamadı', success: false });
        }

        res.status(200).json({ data: updatedBadge, message: "Rozet güncellendi", success: true });

        /*  const updatedBadge: IBadge | null = await BadgeModel.findByIdAndUpdate(
             badgeId,
             {
                 title,
                 categoryId,
                 totalCount,
                 price,
                 attainerRoles: attainerRoles.split(","),
                 badgeImg: `https://rozetle.com:5001/api/image/badge/${req.file?.filename}`,
             },
             { new: true }
         )
         if (!updatedBadge) {
             return res.status(404).json({ message: 'Rozet bulunamadı', success: false });
         }
         res.status(200).json({ data: updatedBadge, message: "Rozet güncellendi", success: true }); */
    } catch (error) {
        res.status(500).json({ message: 'Rozet güncellenirken bir hata oluştu', success: false });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ data: users, success: true });
    } catch (error) {
        res.status(500).json({ message: "Hata oluştu", success: false });
    }
}
const changeRole = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        if (!userId) {
            return res.status(404).json({ message: 'Geçersiz uid', success: false });
        }

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'bir hata oluştu bulunamadı', success: false });
        } else if (user.role === 1) {
            user.role = 0
        } else {
            user.role = 1
        }
        await user.save()
        return res.status(200).json({ message: "Kullanıcı rolü: " + user.role, success: true })
    } catch (error) {
        console.log({ function: "changeRole: ", error })
        return res.status(404).json({ message: 'bir hata oluştu', success: false });
    }
}
const deleteUser = async (req: IRequestWithUser, res: Response) => {
    const { userId } = req.body
    try {
        const deleted = await UserModel.findByIdAndDelete(userId)
        return res.status(200).json({ message: 'Kullanıcı başarıyla silindi', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı silinirken bir hata oluştu', success: false });

    }
}

const getAllVerification = async (req: Request, res: Response) => {
    try {
        const data = await VerificationModel.find()
        return res.status(200).json({ data })
    } catch (error) {

    }
}
const getAllBadgesAdmin = async (req: Request, res: Response) => {
    let data = [];

    try {
        const badges = await BadgeModel.find().populate({
            path: "categoryId",
            model: "Category"
        });
        for (const badge of badges) {
            const datas = await AssignmentModel.find({ badgeId: badge._id })
            data.push({ ...badge, count: datas.length })
        }

        res.status(200).json({ data: data, success: true, message: "Rozetler getirildi" });
    } catch (error) {
        res.status(500).json({ message: 'Rozetler getirilirken bir hata oluştu', success: false });
    }
}

const setBadgeAttainer = async (req: Request, res: Response) => {
    const { userId, badgeId } = req.body
    try {
        const badge = await BadgeModel.findById(badgeId)
        badge.attainerRoles.push(userId)
        await badge.save()
        res.status(200).json({ data: "", success: true, message: "Rozet güncellendi " });


    } catch (error) {
        res.status(500).json({ message: 'Rozet güncellenirken bir hata oluştu', success: false });

    }
}
const changeIsActive = async (req: Request, res: Response) => {
    const { badgeId } = req.body
    try {
        console.log(badgeId)
        const badge = await BadgeModel.findById(badgeId)
        badge.isActive = !badge.isActive
        await badge.save()
        res.status(200).json({ data: "", success: true, message: "Rozet güncellendi " });


    } catch (error) {
        console.log({ method: "changeIsActive", error })
        res.status(500).json({ message: 'Rozet güncellenirken bir hata oluştu', success: false });

    }
}




const getAllNotify = async (req: Request, res: Response) => {
    try {
        const data = await NotifyModel.find()
        res.status(200).json({ data: data, message: "getAlllNotify" })
    } catch (error) {
        res.status(500).json({ error, message: "getAlllNotify" })

    }
}
const getAllToken = async (req: Request, res: Response) => {
    try {
        const data = await NotifyTokenModel.find()
        res.status(200).json({ data: data, message: "getAlllNotifyToken" })
    } catch (error) {
        res.status(500).json({ error, message: "getAlllNotifyToken" })

    }
}


export {
    sendBadges,

    createBadge,
    setBadgeAttainer,
    getAllNotify,
    getAllToken,
    deleteAssign,
    deleteBadge, changeIsActive,
    getAllBadgesAdmin,
    getAllVerification, uploadImgLink,
    deleteUser,
    getAllAssign,
    getAllUsers,
    getInfo,
    changeRole,
    updateBadge
}