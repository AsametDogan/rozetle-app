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
    changeRole,
    sendBadges,
    setBadgeAttainer,
    updateBadge,
    uploadImgLink,
    changeIsActive,

} from "../controllers/admin.controller";
import categoryRouter from "./categoryRoutes"
import { adminMiddleware } from "../middleware/adminMiddleware";
import { exportAssignments, exportBadges, exportCategories, exportUsers } from "../controllers/file.controller";
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


router.put("/badge/changeIsActive", adminMiddleware, changeIsActive)

//rozet silme methodu kaldırılmıştır
router.delete('/badge/delete', deleteBadge) //bodydeki badgeId datasını sil
// { badgeId } body 

router.put('/badge/update', adminMiddleware, updateBadge) //bodydeki badgeId datasını güncelle
// { badgeId } body 

router.get("/getAllVerification", getAllVerification)

router.get("user/getAll", getAllUsers) // tüm kullanıcılar
router.put("/user/changeRole", adminMiddleware, changeRole) // kullanıcıyı rolü 1 yap
// { userId } body

router.get("/users/export", adminMiddleware, exportUsers)
router.get("/badges/export", adminMiddleware, exportBadges)
router.get("/assignments/export", adminMiddleware, exportAssignments)
router.get("/categories/export", adminMiddleware, exportCategories)


router.delete("user/delete", adminMiddleware, deleteUser) // kullanıcıyı sil
// { userId } body




router.post("/img", uploadImg.single("img"), uploadImgLink)

export default router;