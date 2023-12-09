import { Request, Response } from "express";
import { IRequestWithFile, IRequestWithUser, IUser } from "../interfaces";
import { AssignmentModel, UserModel, VerificationModel } from "../models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isValidEmail } from "../helpers/validation.helper";
import { sendVerificationCode } from "../helpers/verification.sender.helper";
import { generateVerificationCode } from "../helpers/verification.code.helper";
import { readFile } from 'fs/promises'
import multer from "multer";
import { profileImgStorage } from "../helpers/storage.helper";
import { trimPhone } from "../helpers/algorithms.helper";

const uploadProfile = multer({ storage: profileImgStorage })

const register = async (req: Request, res: Response) => {
    try {
        let { nickName, name, surname, email, password, phone } = req.body;
        name = name.trim();
        surname = surname.trim();
        email = email.toLowerCase().trim(); // register email string
        phone = trimPhone(phone)
        console.log("Register 1")
        if (!isValidEmail(email)) {
            console.log("Register 2")

            return res.status(409).json({

                message: `${email} mail formatında olmalıdır`, success: false
            })
        }
        try {
            const existingUser = await UserModel.findOne({ email: { $in: [email] } });
            console.log("Register 3")

            if (existingUser) {
                console.log("Register 4")

                return res.status(400).json({ message: `${email} ile bir hesap bulunmakta`, success: false });
            }
        } catch (error) {
            console.log("Register 5")

            return res.status(500).json({ message: `Kontrol sırasında hata oluştu, lütfen bildiriniz`, success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            nickName,
            name,
            surname,
            email: [email],
            phone,
            role: "0",
            password: hashedPassword,
            profileImg: `https://rozetle.com:5001/api/image/profile/${req.file?.filename}`,
            createdDate: new Date(),
        });
        console.log("Register 6")
        // await sendParticipantBadge(email)
        await user.save();
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET || '');
        res.status(201).json({ data: { token }, success: true });
    } catch (error) {
        res.status(500).json({ message: "Kayıt olma sırasında hata meydana geldi", success: false });
    }
};
const registerGoogle = async (req: Request, res: Response) => {
    let { displayName, photoUrl, roleId, email, phone } = req.body;
    let data = []
    console.log("registerGoogle" + displayName)
    if (displayName) {
        data = displayName.split(" ")
        console.log("regiser1")
    }

    if (!isValidEmail(email)) {
        console.log("Register 2")
        return res.status(409).json({
            message: `${email} mail formatında olmalıdır`, success: false
        })
    }

    try {
        const existingUser = await UserModel.findOne({ email: { $in: [email] } });
        console.log("Register 3")
        if (existingUser) {
            console.log("Register 4")
            console.log(existingUser)
            return res.status(403).json({ message: `${email} ile bir hesap bulunmakta`, success: false, data: false });
        }
    } catch (error) {
        console.log("Register 5")
        return res.status(500).json({ message: `Kontrol sırasında hata oluştu, lütfen bildiriniz`, success: false, data: false });
    }

    try {
        console.log("Register 6")

        const user = new UserModel({
            nickName: data[0] ? data[0] : displayName,
            name: data[0] ? data[0] : displayName,
            surname: data.length > 0 ? data[1] : "",
            email: [email],
            phone: phone ? trimPhone(phone) : "",
            role: roleId,
            profileImg: photoUrl,
            createdDate: new Date(),
        });
        await user.save();
        console.log("Register 7")

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET || '');
        res.status(201).json({ data: { token }, success: true });
    } catch (error) {
        console.log("Register 8:" + error)
        res.status(500).json({ message: "Kayıt olma sırasında hata meydana geldi", success: false, data: false });
    }
}
/* 
const deleteAll = async (req: Request, res: Response) => {
    try {
        const result = await UserModel.deleteMany({});
        res.json({ message: `${result.deletedCount} users deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
} */

const sendParticipantBadge = async (data) => {
    const assignment = new AssignmentModel({
        description: "Etkinliğimize katıldığınız için teşekkürler...",
        senderId: "6547439b60eb6a846a2b51f6",
        receiverInfo: data,
        badgeId: "6546b60392f24080b04ff02e",
        assignDate: new Date(),
    });

    await assignment.save();
}

const loginEmail = async (req: Request, res: Response) => {
    try {
        let { email } = req.body
        console.log(email)
        email = email.toLowerCase().trim();
        const user: IUser | null = await UserModel.findOne({ email: { $in: [email] } });
        if (!user) {
            return res.status(401).json({ message: `${email} ile hesap bulunamadı`, success: false });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET || '');

        return res.status(200).json({ data: { token }, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Google giriş Yapılamadı", success: false, data: error });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase().trim();
        const user: IUser | null = await UserModel.findOne({ email: { $in: [email] } });
        if (!user) {
            return res.status(401).json({ message: `${email} ile hesap bulunamadı`, success: false });
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Şifre Yanlış', success: false });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET || '');

        res.status(200).json({ data: { token }, success: true });

    } catch (error) {
        res.status(500).json({ message: "Giriş Yapılamadı", success: false });
    }
};

const getMyInfo = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }

    try {
        const user = await UserModel.findOne(userId).select('-password')

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı', success: false });
        }

        res.status(200).json({ data: user, success: true, message: "Kullanıcı bilgileri oluşturuldu" });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı bilgileri getirilirken bir hata oluştu', success: false });
    }
}

const addAnEmail = async (req: IRequestWithUser, res: Response) => {
    const user = req.user;
    let { newEmail } = req.body

    if (!user) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    try {
        const founded = await UserModel.findOne({ email: { $in: [newEmail] } }).select('-password')
        if (founded) {
            return res.status(400).json({ message: `${newEmail} ile ilişkilendirilmiş bir hesap bulunmakta`, success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Bilinmeyen bir hata oluştu', success: false });
    }
    try {
        const verifiedEmail = await VerificationModel.findOne({ email: newEmail })
        if (!verifiedEmail) {
            return res.status(404).json({ message: "Mail eklenirken bir sorun çıktı, tekrar deneyin", success: false })
        }
        if (!verifiedEmail.verified) {
            return res.status(403).send({ message: "Doğrulanmamış mail adresi, tekrar deneyin", success: false })
        }

        newEmail = newEmail.toLowerCase().trim()
        user.email.push(newEmail)
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { $set: user },
            { new: true, select: '-password' }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.status(200).json({ data: updatedUser, success: true, message: "Mail başarıyla eklendi" })

    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı güncellenirken bir hata oluştu', success: false });
    }
}

const deleteAnEmail = async (req: IRequestWithUser, res: Response) => {

    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }

    try {
        let { deleteEmail } = req.body
        deleteEmail = deleteEmail.toLowerCase().trim()
        if (user.email[0] == deleteEmail) {
            return res.status(403).json({ message: 'Birincil email adresiniz silinemez', success: false });
        }

        user.email = user.email.filter((email) => email != deleteEmail)
        const updatedUser = await UserModel.findByIdAndUpdate(
            user._id,
            { $set: user },
            { new: true, select: '-password' }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı', success: false });
        }
        res.status(200).json({ data: updatedUser, success: true, message: "Silme başarılı" })

    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı güncellenirken bir hata oluştu', success: false });
    }
}
/* const updateProfile = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id; // Middleware ile eklenen kullanıcı kimliğini al
    if (req.file) {
        console.log("1")
        uploadProfile.single('profileImg')
    }
    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    console.log(req.body)
    try {
        const { nickName, name, surname, password, phone, profileImg } = req.body;
        let hashedPassword;
        if (password) {
            console.log("2")

            hashedPassword = await bcrypt.hash(password, 10);
        }
        console.log("3")

          console.log("!!!!!!!!!!" + hashedPassword)
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                nickName,
                name,
                surname,
                phone,
                password: hashedPassword,
                // profileImg: req.file.filename,
            },
            { new: true, select: '-password' } // Güncellenmiş kullanıcıyı döndür ve şifreyi hariç tut
        );
        console.log("4")

        if (!updatedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı', success: false });
        }
        console.log("5")

        res.status(200).json({ data: updatedUser, success: true });
    } catch (error) {
        console.log({ location: "updateProfile", error })
        res.status(500).json({ message: 'Kullanıcı güncellenirken bir hata oluştu', success: false });
    }
} */


const updateProfile = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id; // Middleware ile eklenen kullanıcı kimliğini al

    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }
    try {
        const { nickName, name, surname, password, phone, profileImg } = req.body;
        /*  let hashedPassword;
         if (password) {
             console.log("2")
 
             hashedPassword = await bcrypt.hash(password, 10);
         } */
        if (req.file?.filename) {
            await UserModel.findByIdAndUpdate(
                userId,
                {
                    nickName,
                    name,
                    surname,
                    phone: trimPhone(phone),
                    // password: hashedPassword,
                    profileImg: req.file?.filename ? `https://rozetle.com:5001/api/image/profile/${req.file?.filename}` : null,
                },
                { new: true, select: '-password' } // Güncellenmiş kullanıcıyı döndür ve şifreyi hariç tut
            );
        } else {
            await UserModel.findByIdAndUpdate(
                userId,
                {
                    nickName,
                    name,
                    surname,
                    phone: trimPhone(phone),
                },
                { new: true, select: '-password' } // Güncellenmiş kullanıcıyı döndür ve şifreyi hariç tut
            );
        }

        console.log("4")


        console.log("5")

        res.status(200).json({ data: null, message: "Güncelleme başarılı", success: true });
    } catch (error) {
        console.log({ location: "updateProfile", error })
        res.status(500).json({ message: 'Kullanıcı güncellenirken bir hata oluştu', success: false });
    }
}

const verifyMailSender = async (req: Request, res: Response) => {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    try {
        const user: IUser | null = await UserModel.findOne({ email: { $in: [email] } });
        if (user) {
            return res.status(400).json({ message: `${email} ile ilişkilendirilmiş bir hesap bulunmakta`, success: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Doğrulama kodu gönderilirken hata meydana geldi", success: false });

    }
    const verificationCode = generateVerificationCode()
    try {
        const foundedVerify = await VerificationModel.findOne({ email })
        if (foundedVerify) {
            foundedVerify.verificationCode = verificationCode;
            foundedVerify.verified = false
            foundedVerify.createdDate = new Date()
            await foundedVerify.save()
        }
        else {
            const verification = new VerificationModel({
                email: email,
                verified: false,
                verificationCode: verificationCode,
                createdDate: new Date(),
            });
            await verification.save();
        }
        try {
            const result = await sendVerificationCode(email, verificationCode)
            if (result) {
                res.status(200).json({ message: "Doğrulama Kodu Gönderildi", success: true });
            }
            else {
                throw new Error("Mail Gönderme başarısız");
            }
        } catch (error) {
            res.status(500).json({ message: "Doğrulama kodu gönderilirken hata meydana geldi", success: false });
        }

    } catch (error) {
        res.status(500).json({ message: "Doğrulama kodu kayıt edilirken hata meydana geldi", success: false });
    }
}

const forgottenPassMailSender = async (req: Request, res: Response) => {
    try {
        let { email } = req.body;
        email = email.toLowerCase().trim();
        const user = await UserModel.findOne({ email: { $in: [email] } });
        if (!user) {
            return res.status(401).json({ message: `${email} ile hesap bulunamadı`, success: false });
        }
        const verificationCode = generateVerificationCode()
        try {
            const foundedVerify = await VerificationModel.findOne({ email })
            if (foundedVerify) {
                foundedVerify.verificationCode = verificationCode;
                foundedVerify.createdDate = new Date()
                await foundedVerify.save()
            }
            else {
                const verification = new VerificationModel({
                    email: email,
                    verified: false,
                    verificationCode: verificationCode,
                    createdDate: new Date(),
                });
                await verification.save();
            }
        } catch (error) {
            res.status(500).json({ message: "Doğrulama kodu kayıt edilirken hata meydana geldi", success: false });
        }
        await sendVerificationCode(email, verificationCode)
        res.status(200).json({ message: "Doğrulama Kodu Gönderildi", success: true });
    } catch (error) {
        res.status(500).json({ message: "Doğrulama kodu gönderilemedi, daha sonra tekrar deneyin", success: false });
    }
}

const verifyPassCode = async (req: Request, res: Response) => {
    let { email, verificationCode } = req.body
    email = email.toLowerCase().trim();
    verificationCode = verificationCode.trim()
    console.log("verify pass-1")
    try {
        //const foundedVerify = await VerificationModel.findOne({ email })
        console.log({ email, verificationCode })
        const verification = await VerificationModel.findOne({ email })
        console.log(verification)
        if (!verification) {
            console.log("verify pass-2")
            return res.status(500).json({ message: "Sistem bakımda, lütfen daha sonra tekrar deneyin", success: false });
        }
        if (verification?.verificationCode !== verificationCode) {
            console.log("verify pass-3")
            return res.status(401).json({ message: "Doğrulama kodu hatalı", success: false })
        }
        const data = await VerificationModel.findByIdAndUpdate(verification._id,
            { verified: true },
            { new: true }
        )
        console.log("verify pass-4")
        return res.status(200).json({ message: "Doğrulama başarılı", success: true })

    } catch (error) {
        console.log("verify pass-5")
        return res.status(500).json({ message: "Doğrulama sırasında bir hata meydana geldi", success: false });
    }
}

const setNewPass = async (req: Request, res: Response) => {
    let { email, newPass } = req.body
    email = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(newPass, 10);
    try {
        const user = await UserModel.findOne({ email: { $in: [email] } });
        if (!user) {
            return res.status(401).json({ message: `${email} ile ilişkilendirilmiş hesap bulunamadı`, success: false });
        }

        const verification = await VerificationModel.findOne({ email })
        if (!verification) {
            res.status(404).json({ message: "Doğrulama bilgisi bulunamadı, daha sonra tekrar deneyin", success: false });
        }
        if (verification.verified = false) {
            res.status(403).json({ message: "Doğrulanmamış işlem, lütfen tekrar deneyiniz", success: false })
        }

        user.password = hashedPassword
        await user.save()
        res.status(200).json({ message: "Şifre değiştirme başarılı", success: true })
    } catch (error) {
        res.status(500).json({ message: "Şifre yenilemede bir hata meydana geldi", success: false });
    }
}



const deactiveProfile = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }

    try {
        const deactivatedUser: IUser | null = await UserModel.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true, select: '-password' }
        );

        if (!deactivatedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı', success: false });
        }

        res.status(200).json({ message: 'Kullanıcı hesabı deaktif edildi', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı devre dışı bırakılırken bir hata oluştu', success: false });
    }
}

const deleteProfile = async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Yetkilendirme hatası', success: false });
    }

    try {
        const deletedUser = await UserModel.findById(userId)
        deletedUser.email = []
        await deletedUser.save()

        // await UserModel.findByIdAndDelete(userId).select('-password');

        if (!deletedUser) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı', success: false });
        }

        res.status(200).json({ message: 'Kullanıcı başarıyla silindi', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı silinirken bir hata oluştu', success: false });
    }
}



export {
    deactiveProfile,
    deleteProfile,
    register,
    login, registerGoogle,
    updateProfile,
    getMyInfo,
    deleteAnEmail, loginEmail,
    addAnEmail,
    verifyPassCode,
    setNewPass,
    forgottenPassMailSender,
    verifyMailSender,

}