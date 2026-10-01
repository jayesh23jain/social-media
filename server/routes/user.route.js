import express from 'express'
import { registerUser , loginUser , getMe , logout} from '../controllers/user.controller.js'
import isAuthenticated from '../middleware/authMiddleware.js'

const userRoutes = express.Router()

userRoutes.post('/register' , registerUser)
userRoutes.post('/login' , loginUser)
userRoutes.get('/me' , isAuthenticated , getMe)
userRoutes.post('/logout' , logout)

export default userRoutes