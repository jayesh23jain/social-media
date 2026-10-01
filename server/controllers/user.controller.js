import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'All feilds are required' })
        }

        if (password.length <= 6) {
            return res.status(400).json({ message: 'Password should be greater then 6' })
        }

        const userAlreadyExists = await User.findOne({ username })

        if (userAlreadyExists) {
            return res.status(409).json({ message: 'Username already Exists' })
        }

        const emailAlreadyExists = await User.findOne({ email })

        if (emailAlreadyExists) {
            return res.status(409).json({ message: 'Email already Exists' })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await User.create({
            name,
            username,
            email,
            password : hashedPassword
        })

        res.status(201).json({ message: 'New User Registered', user: newUser })

    } catch (error) {
        res.status(500).json({ message: 'Server crashed', error: error.message })
    }
}