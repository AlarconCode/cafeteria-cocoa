import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
  deleteUser,
  getUsers, 
  login, 
  logout, 
  profile, 
  register, 
  updateUser, 
  verifyToken} from "../controller/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { authSchema } from "../schemas/auth.schema.js";
import { loginSchema } from "../schemas/login.schema.js";

const authRouter = Router()

authRouter.get('/users',authRequired, getUsers)
authRouter.get('/profile', authRequired, profile)
authRouter.post('/register', validateSchema(authSchema), register) 
authRouter.post('/login', validateSchema(loginSchema) , login)
authRouter.post('/logout', logout)
authRouter.put('/update', authRequired, updateUser)
authRouter.delete('/user/:id', authRequired, deleteUser)
authRouter.post('/verify-token', authRequired, verifyToken)

export default authRouter

