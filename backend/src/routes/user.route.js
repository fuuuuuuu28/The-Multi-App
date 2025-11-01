import {Router} from "express"
import { clerkProvider, getMessages, getProfile } from "../controllers/user.controller.js"
import { getUser } from "../middlewares/middlewars.js"

const router = Router()

router.post('/clerkProvider',clerkProvider)
router.get('/',getUser,getProfile)
router.get('/messages/:userId', getUser, getMessages)

export default router;