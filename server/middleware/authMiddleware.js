import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const isAuthenticated = async(req , res , next) => {

    try {
        const token = req.cookies.token

        const decoded = jwt.verify(token , process.env.jwt_secret)

        const user = await User.findById(decoded.userId)

        req.user = user

        next()
    } catch (error) {
        res.status(500).json({message : 'Serever crashed'})
    }
}

export default isAuthenticated