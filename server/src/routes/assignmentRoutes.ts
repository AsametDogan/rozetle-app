import express from "express"
import {  deleteAssign, getAllAssign, getAssignment, getInfo, getMyReceived, getMySent, newAssign } from "../controllers/assignment.controller";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();



router.get('/myReceived', authMiddleware, getMyReceived)
router.get('/my/:id', getAssignment)
router.get('/mySent', authMiddleware, getMySent)
router.post('/newAssign', authMiddleware, newAssign)
router.get("/getAll", getAllAssign)
router.delete('/delete/:id', deleteAssign)

//router.get("/deleteAll", deleteAll)
router.get("/getInfo", getInfo)

export default router;