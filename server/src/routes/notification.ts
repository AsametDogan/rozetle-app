import express from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { getMyNotifies, setNotifyToken } from "../controllers/notify.controller";

const router = express.Router();



router.get('/myNotifies', authMiddleware, getMyNotifies)

router.post("/setNotifyToken", authMiddleware, setNotifyToken)





export default router;