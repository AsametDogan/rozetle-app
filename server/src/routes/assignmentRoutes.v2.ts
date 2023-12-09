import express from "express"
import { getAssignment, getMyReceived, getMySent, newAssign } from "../controllers/assignment.controller.v2";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();



router.get('/myReceived', authMiddleware, getMyReceived)
router.get('/my/:id', getAssignment)
router.get('/mySent', authMiddleware, getMySent)
router.post('/newAssign', authMiddleware, newAssign)

export default router;