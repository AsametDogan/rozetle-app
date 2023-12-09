import express from "express"
import { getAllBadges } from "../controllers/badge.controller";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";
import { badgeImgStorage } from "../helpers/storage.helper";

const router = express.Router();
router.get('/getAll', getAllBadges)


//router.get("/deleteAll", deleteAll)

export default router;