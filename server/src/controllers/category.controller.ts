import { Response, Request } from "express";
import { IRequestWithUser } from "../interfaces";
import { CategoryModel } from "../models";

const createCategory = async (req: IRequestWithUser, res: Response) => {

    const { title } = req.body;
    try {
        const newBadge = new CategoryModel({
            title
        });
        await newBadge.save();
        return res.status(201).json({ message: 'Kategori oluşturma başarılı', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Kategori oluşturulurken bir hata oluştu', success: false });
    }
}

const updateCategory = async (req: IRequestWithUser, res: Response) => {

    const { title, categoryId } = req.body;

    try {
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı" });
        }

        category.title = title;
        await category.save();

        return res.status(200).json({ message: "Kategori güncelleme başarılı", data: category, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
const deleteCategory = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id
    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    try {
        const { id } = req.body;
        await CategoryModel.findByIdAndDelete(id)
        res.status(201).json({ message: 'Kategori silme başarılı', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Kategori silinirken bir hata oluştu', success: false });
    }
}

const getAllCategory = async (req: Request, res: Response) => {

    try {
        const categories = await CategoryModel.find()
        if (!categories) {
            res.status(404).json({ message: "Henüz hiç kategori oluşturulmamış", success: false })
        }

        res.status(201).json({ message: 'Kategoriler getirildi', success: true, data: categories });
    } catch (error) {
        res.status(500).json({ message: 'Kategori getirilirken bir hata oluştu', success: false });
    }
}


export { createCategory, deleteCategory, getAllCategory, updateCategory }