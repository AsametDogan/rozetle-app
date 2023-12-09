import express from "express"
import { authMiddleware } from "../middleware/authMiddleware";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/category.controller";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = express.Router();


router.get('/getAll', adminMiddleware, getAllCategory)
router.post('/create', adminMiddleware, createCategory)
router.delete('/delete', adminMiddleware, deleteCategory)
router.put("/update", adminMiddleware, updateCategory)

export default router;