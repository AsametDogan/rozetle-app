import express from "express"
import userRouter from "./userRoutes"
import badgeRouter from "./badgeRoutes"
import assignRouter from "./assignmentRoutes"
import assignRouter2 from "./assignmentRoutes.v2"
import categoryRouter from "./categoryRoutes"
import imageRouter from "./imageRoutes"
import adminRouter from "./adminRoutes"
import notification from "./notification"

const router = express.Router();



router.use('/notification', notification)
router.use('/user', userRouter)
router.use('/badge', badgeRouter)
router.use('/assign', assignRouter)
router.use('/assign2', assignRouter2)
router.use('/admin', adminRouter)
router.use('/image', imageRouter)




export default router