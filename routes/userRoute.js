import express from 'express'
import { userLogin, userSignUp } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/register", userSignUp)
userRouter.post("/login", userLogin)

export default userRouter;