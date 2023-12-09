import { Request, Response } from "express";
import { readFile } from 'fs/promises'
import { IRequestWithUser } from "../interfaces";
import { NotifyModel, NotifyTokenModel } from "../models";

const getMyNotifies = async (req: IRequestWithUser, res: Response) => { //bana atanmış bildirimler
    const userId = req.user?._id
    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    try {
        const notifies = await NotifyModel.find({ ownerId: userId })

        if (!notifies) {
            res.status(200).json({ message: "Bildirim yok \n", data: [], success: true })
        }
        return res.status(200).json({ message: "Bildirimler getirildi", data: notifies, success: true })

    } catch (error) {
        res.status(500).json({ message: "Bildirimler getirilemedi: \n", data: error })
    }
}

const setNotifyToken = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id
    const { firebaseToken } = req.body
    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    try {
        const existToken = await NotifyTokenModel.findOne({ userId })
        if (existToken) {
            if (existToken.firebaseToken !== firebaseToken) {

                await NotifyTokenModel.findByIdAndUpdate(
                    existToken._id,
                    { $set: { firebaseToken } },
                    { new: true })
            }
        } else {
            const result = new NotifyTokenModel({
                userId: userId,
                firebaseToken
            })
            await result.save();
        }



        return res.status(200).json({ message: "Token kayıt edildi getirildi", data: "başarılı", success: true })

    } catch (error) {
        res.status(500).json({ message: "Token kayıt edilemedi: \n", data: error })
    }
}

//ownerId si yoksa geç
const setNotify = async (ownerId, title, content) => {

    try {
        const notify = new NotifyModel({
            ownerId,
            title,
            content,
            date: new Date(),
        });

        await notify.save();
        console.log("setNotify bildirim veri tabanına kayıt oldu")
        return true
    } catch (error) {
        console.log({ message: "setNotify bildirim veri tabanına kayıt oldu", error })
        return false

    }
}

export {
    getMyNotifies, setNotify, setNotifyToken
}