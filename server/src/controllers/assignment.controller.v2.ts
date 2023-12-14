import { Request, Response } from "express";
import { IAssignment, IRequestWithUser, IUser } from "../interfaces";
import { AssignmentModel, BadgeModel, NotifyTokenModel, UserModel } from "../models";
import { isValidEmail } from "../helpers/validation.helper";
import { trimPhone } from "../helpers/algorithms.helper";
import { setNotify } from "./notify.controller";

import { admin } from '../firebase-config.js'


const newAssign = async (req: IRequestWithUser, res: Response) => {
    try {
        let { description, receiverInfo, badgeId } = req.body;
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
        if (req.user?.email.includes(receiverInfo) || req.user?.phone === receiverInfo) {
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
        if (!badge.attainerRoles.includes(userRole.toString())) {
            return res.status(401).json({ message: 'Bu rozeti almaya yetkiniz yoktur', success: false });
        }
        if (badge.restCount <= 0) {
            if (badge.restCount != -999) {
                return res.status(400).json({ message: 'Rozet stoğu kalmamıştır', success: false });
            }
        }
        // restCount değerini azalt

        if (!isValidEmail(receiverInfo)) {
            receiverInfo = trimPhone(receiverInfo)
        }
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

        let receiverUser
        if (isValidEmail(receiverInfo)) {
            console.log(receiverInfo + " bir email")
            receiverUser = await UserModel.findOne({ email: { $in: [receiverInfo] } });
        } else {
            console.log(receiverInfo + " bir numara")
            receiverUser = await UserModel.findOne({ phone: trimPhone(receiverInfo) })
        }
        console.log(receiverUser)
        if (receiverUser) {
            console.log("first")
            setNotify(receiverUser?._id, "Rozetlendin !", `${req.user?.name} ${req.user?.surname} kullanıcısı sana ${badge.title} rozetini gönderdi\nHemen sen de Rozetle`)
            const tokenData = await NotifyTokenModel.findOne({ userId: receiverUser?._id })
            if (tokenData) {
                const message = {
                    notification: {
                        title: 'Rozetlendiniz',
                        body: `${req.user?.name} ${req.user?.surname} kullanıcısı sana ${badge.title} rozetini gönderdi\nHemen sen de Rozetle`
                    },
                    token: tokenData.firebaseToken
                };
                admin.messaging().send(message)
                    .then((response) => {
                        console.log('Bildirim gönderildi:', response);
                        res.status(201).json({ message: 'Rozet gönderildi', success: true, data: assignment._id, baseUrl: "https://www.rozetle.com/assign/" });
                    })
                    .catch((error) => {
                        console.log('Bildirim gönderme hatası:', error);
                        res.status(500).json({ message: 'Rozet gönderilirken bir hata oluştu', data: "", baseUrl: "https://www.rozetle.com/assign/", success: false });
                    });
            }
        }


        res.status(201).json({ message: 'Rozet gönderildi', success: true, data: assignment._id, baseUrl: "https://www.rozetle.com/assign/" });
    } catch (error) {
        console.log({ message: 'Rozet gönderilirken bir hata oluştu', data: "", baseUrl: "https://www.rozetle.com/assign/", error: error })
        res.status(500).json({ message: 'Rozet gönderilirken bir hata oluştu', data: "", baseUrl: "https://www.rozetle.com/assign/", success: false });
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




const getMyReceived = async (req: IRequestWithUser, res: Response) => {
    const receiverEmail = req.user?.email;
    let receiverPhone = req.user?.phone;
    receiverPhone = trimPhone(receiverPhone)
    console.log("TELEFON NUMARASı" + receiverPhone)
    if (!receiverEmail) {
        return res.status(401).json({ message: 'Alıcı iletişim adreslerini kontrol edin', succes: false });
    }
    try {
        let receivedBadges = await AssignmentModel.find({ receiverInfo: ({ $in: receiverEmail }) })
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
        let assignWithPhone = await AssignmentModel.find({ receiverInfo: receiverPhone })
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
        receivedBadges = [...receivedBadges, ...assignWithPhone]
        if (!receivedBadges) {
            return res.status(204).json({ message: 'Henüz hiç rozet almadınız', data: [], succes: false, baseUrl: "https://www.rozetle.com/assign/" });
        }
        console.log(receivedBadges)
        res.status(200).json({ data: receivedBadges.reverse(), baseUrl: "https://www.rozetle.com/assign/", message: "İşlem Başarılı", succes: true });
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


        res.status(200).json({ message: "İşlem başarılı", data: sentBadges.reverse(), baseUrl: "https://www.rozetle.com/assign/", success: true })
    } catch (error) {
        res.status(500).json({ message: 'Rozet bilgileri getirilirken bir hata oluştu', succes: false });
    }
}





export { getMyReceived, getMySent, newAssign, getAssignment }