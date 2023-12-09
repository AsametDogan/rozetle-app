import express from "express"
import { getBadgeImg, getImg, getProfileImg } from "../controllers/image.controller";

const router = express.Router();



router.get('/profile/:id', getProfileImg)
router.get('/badge/:id', getBadgeImg)

router.get("/img/:id", getImg)

export default router;