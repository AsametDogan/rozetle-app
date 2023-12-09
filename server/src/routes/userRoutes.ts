import express from "express"
import {
    getMyInfo,
    login,
    register,
    updateProfile,
    deactiveProfile,
    deleteProfile,
    deleteAnEmail,
    addAnEmail,
    forgottenPassMailSender,
    verifyPassCode,
    setNewPass,
    verifyMailSender,
    registerGoogle,
    loginEmail,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";
import { profileImgStorage } from "../helpers/storage.helper";
import { getBadgeImg, getProfileImg } from "../controllers/image.controller";
const uploadProfile = multer({ storage: profileImgStorage })

const router = express.Router();

router.post('/register', uploadProfile.single('profileImg'), register)
router.post('/login', login)

router.post("/loginGoogle", loginEmail)
router.post("/registerG", registerGoogle)


router.post('/addEmail', authMiddleware, addAnEmail)
router.delete('/deleteEmail', authMiddleware, deleteAnEmail)
router.get('/getMyInfo', authMiddleware, getMyInfo)
router.put('/update', authMiddleware, uploadProfile.single('profileImg'), updateProfile)
router.delete('/delete', authMiddleware, deleteProfile)
router.put('/deactive', authMiddleware, deactiveProfile)

router.post("/sendVerifyCode", verifyMailSender)
router.post("/forgottenPass", forgottenPassMailSender)
router.post("/verifyCode", verifyPassCode)
router.post("/setNewPass", setNewPass)


export default router;


