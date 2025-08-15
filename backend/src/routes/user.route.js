import {Router} from "express"
import { clerkProvider, getMessages, getUsers } from "../controllers/user.controller.js"
import { getUser } from "../middlewares/middlewars.js"

const router = Router()

router.post('/clerkProvider',clerkProvider)
router.get('/',getUser,getUsers)
router.get('/messages/:userId', getUser, getMessages)

export default router;