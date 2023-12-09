import { Request, Response } from "express";
import { IBadge, IRequestWithUser } from "../interfaces";
import { AssignmentModel, BadgeModel } from "../models";
import { shuffleArray } from "../helpers/algorithms.helper";






const getAllBadges = async (req: Request, res: Response) => {


    try {
        const badges = await BadgeModel.find({ isActive: true }).populate({
            path: "categoryId",
            model: "Category"
        });

        res.status(200).json({ data: shuffleArray(badges), success: true, message: "Rozetler getirildi" });
    } catch (error) {
        res.status(500).json({ message: 'Rozetler getirilirken bir hata oluştu', success: false });
    }

}

/* const deleteAll = async (req: Request, res: Response) => {
    try {
        const result = await BadgeModel.deleteMany({});
        res.json({ message: `${result.deletedCount} badges deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
} */

const getAvailableBadges = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id
    const userRole = req.user?.role
    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    if (!userRole) {
        return res.status(401).json({ message: 'Yetkilendirilmemiş kullanıcı', success: false });
    }

    try {
        const badges = await BadgeModel.find().populate({
            path: "categoryId",
            model: "Category"
        });

        const availableBadges = badges.filter((badge => badge.attainerRoles.includes(userRole)))
        res.status(200).json({ data: availableBadges, message: "Uygun rozetler getirildi", success: true });
    } catch (error) {
        res.status(500).json({ message: 'Rozetler getirilirken bir hata oluştu', success: false });
    }

}

export { getAllBadges, getAvailableBadges }