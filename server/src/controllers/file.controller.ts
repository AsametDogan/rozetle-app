import excel from 'exceljs';
import { Request, Response, response } from "express";
import { AssignmentModel, BadgeModel, CategoryModel, NotifyModel, NotifyTokenModel, UserModel, VerificationModel } from "../models";
import { IAssignment, IBadge, IRequestWithUser } from "../interfaces";
import { mailSender } from "../helpers/mail.sender.helper";
import { isValidEmail } from "../helpers/validation.helper";
import { shuffleArray, trimPhone } from "../helpers/algorithms.helper";


const exportUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 25 },
            { header: 'Nickname', key: 'nickName', width: 15 },
            { header: 'İsim', key: 'name', width: 15 },
            { header: 'Soyisim', key: 'surname', width: 15 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Telefon', key: 'phone', width: 15 },
            { header: 'Role', key: 'role', width: 10 },
            { header: 'Kayıt tarihi', key: 'createdDate', width: 20 },
            { header: 'Aktif mi', key: 'isActive', width: 10 },
        ];

        users.forEach(user => {
            worksheet.addRow({
                id: user._id.toString(),
                nickName: user.nickName,
                name: user.name,
                surname: user.surname,
                email: user.email.join(', '), // If email is an array
                phone: user.phone,
                role: user.role,
                createdDate: user.createdDate,
                isActive: user.isActive,
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

        // Pipe the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting to XLS:', error);
        res.status(500).send('Internal Server Error');
    }
}
const exportAssignments = async (req: Request, res: Response) => {
    try {
        const assignments = await AssignmentModel.find();
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Assignments');

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 25 },
            { header: 'Gönderici Id', key: 'senderId', width: 25 },
            { header: 'Alıcı Bilgisi', key: 'receiverInfo', width: 20 },
            { header: 'Rozet Id', key: 'badgeId', width: 25 },
            { header: 'Açıklama', key: 'description', width: 25 },
            { header: 'Tarih', key: 'assignDate', width: 15 },


        ];

        for (const assignment of assignments) {
            worksheet.addRow({
                id: assignment._id.toString(),
                senderId: assignment.senderId,
                receiverInfo: assignment.receiverInfo,
                badgeId: assignment.badgeId,
                description: assignment.description,
                assignDate: assignment.assignDate
            });
        }
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=assignments.xlsx'
        );

        await workbook.xlsx.write(res);

        res.end();
    } catch (error) {
        console.error('Error exporting to XLS:', error);
        res.status(500).send('Internal Server Error');
    }
}
const exportCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find();
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Categories');

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 25 },
            { header: 'Rozet İsmi', key: 'title', width: 25 },


        ];

        for (const category of categories) {
            worksheet.addRow({
                id: category._id.toString(),
                title: category.title,
            });
        }
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=categories.xlsx'
        );

        await workbook.xlsx.write(res);

        res.end();
    } catch (error) {
        console.error('Error exporting to XLS:', error);
        res.status(500).send('Internal Server Error');
    }
}

const exportBadges = async (req: Request, res: Response) => {
    try {
        const badges = await BadgeModel.find();
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Badges');

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 25 },
            { header: 'Rozet', key: 'title', width: 15 },
            { header: 'Kategori', key: 'categoryId', width: 15 },
            { header: 'Toplam Adet', key: 'totalCount', width: 15 },
            { header: 'Kalan Adet', key: 'restCount', width: 15 },
            { header: 'Ücret', key: 'price', width: 15 },
            { header: 'Yetkili id', key: 'attainerRoles', width: 25 },
            { header: 'Oluşturulma Tarihi', key: 'createdDate', width: 20 },
            { header: 'Aktif mi', key: 'isActive', width: 15 },
        ];

        for (const badge of badges) {
            worksheet.addRow({
                id: badge._id.toString(),
                title: badge.title,
                categoryId: (await CategoryModel.findById(badge.categoryId)).title,
                totalCount: badge.totalCount,
                restCount: badge.restCount,
                price: badge.price,
                attainerRoles: badge.attainerRoles.join(', '),
                createdDate: badge.createdDate,
                isActive: badge.isActive
            });
        }

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=badges.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting to XLS:', error);
        res.status(500).send('Internal Server Error');
    }
}

export {
    exportUsers, exportAssignments, exportBadges, exportCategories
}
