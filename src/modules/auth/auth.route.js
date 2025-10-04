import { Router } from "express";
import * as AC from "./auth.controller.js";
import { isSuperAdmin } from "../../middleware/authorization.js";

const userRouter = Router()

userRouter.post('/register', AC.signup)
userRouter.post('/login', AC.login)
userRouter.post('/logout', AC.logout)
userRouter.post('/forgetPassword', AC.forgetPassword)
userRouter.post('/resetPassword/:token', AC.resetPassword)
userRouter.get('/getUser/:id', AC.getSingleUser)

userRouter.put('/updateProfile/:id', AC.updateProfile)

userRouter.get('/getAll', AC.getAllUser)

userRouter.get('/getDashboard', AC.getAllLength)

userRouter.post("/forget-Password", AC.forgetPassword)
userRouter.post('/reset-password', AC.resetPassword)

userRouter.get('/verify', AC.verifyUserToken)



// ! Authorized - Super Admin Only
userRouter.post('/addUser', isSuperAdmin, AC.addUser)
userRouter.put('/update/:id', isSuperAdmin, AC.UpdateUser)
userRouter.delete('/:id', isSuperAdmin, AC.deleteUser)
export default userRouter