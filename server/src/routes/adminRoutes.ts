import express from "express"
import { deleteAssign, getAllAssign, getInfo } from "../controllers/assignment.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { badgeImgStorage } from "../helpers/storage.helper";
import { imgStorage } from "../helpers/storage.helper";
import multer from "multer";
import {
    createBadge,
    deleteBadge,
    deleteUser,
    getAllBadgesAdmin,
    getAllNotify,
    getAllToken,
    getAllUsers,
    getAllVerification,
    levelUp,
    sendBadges,
    setBadgeAttainer,
    updateBadge,
    uploadImgLink
} from "../controllers/admin.controller";
import categoryRouter from "./categoryRoutes"
import { adminMiddleware } from "../middleware/adminMiddleware";
const router = express.Router();

const uploadBadge = multer({ storage: badgeImgStorage })
const uploadImg = multer({ storage: imgStorage })




router.use('/category', categoryRouter)

router.get("/assign/getAll", getAllAssign) // Tüm atamaları listele
router.delete('assign/delete/:id', adminMiddleware, deleteAssign) // paramsdaki id atamasını sil
router.get("/getInfo", getInfo) //alma ve gönderme sayıları ile kullanıcılar

router.get("/getAllUsers", getAllUsers)
router.get("/getAllNotify", getAllNotify)
router.get("/getAllToken", getAllToken)


router.get("/getAllBadges", getAllBadgesAdmin)
router.post("/sendBadges", adminMiddleware, sendBadges) //bir liste alıcıya rozet + mail gönderme
//{ receiversData, badgeId, description, mailSubject, mailText }


router.post('/badge/create', adminMiddleware, uploadBadge.single('badgeImg'), createBadge)
//{ title, categoryId, totalCount, price, attainerRoles }


router.post("/setBadgeAttainer", adminMiddleware, setBadgeAttainer) // rozetin attainerRoles arrrayine userId ekle
//userId badgeId


//rozet silme methodu kaldırılmıştır
router.delete('/badge/delete', deleteBadge) //bodydeki badgeId datasını sil
// { badgeId } body 

router.put('/badge/update', adminMiddleware, updateBadge) //bodydeki badgeId datasını güncelle
// { badgeId } body 

router.get("/getAllVerification", getAllVerification)

router.get("user/getAll", getAllUsers) // tüm kullanıcılar
router.post("user/levelUp", adminMiddleware, levelUp) // kullanıcıyı rolü 1 yap
// { userId } body

router.delete("user/delete", adminMiddleware, deleteUser) // kullanıcıyı sil
// { userId } body




router.post("/img", uploadImg.single("img"), uploadImgLink)

export default router;