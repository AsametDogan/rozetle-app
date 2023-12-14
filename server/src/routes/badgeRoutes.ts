import express from "express"
import { getAllBadges, getAvailableBadges } from "../controllers/badge.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get('/getAll', getAllBadges)
router.get("/getAvailable", authMiddleware, getAvailableBadges)


//router.get("/deleteAll", deleteAll)

export default router;