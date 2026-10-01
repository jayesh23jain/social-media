import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import genToken from '../utils/generateToken.js'

const cookieOptions = {
    httpOnly : true
}

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

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })

        const token = genToken(newUser._id)

        res.cookie('token' , token , cookieOptions)

        res.status(201).json({ message: 'New User Registered', user: newUser })

    } catch (error) {
        res.status(500).json({ message: 'Server crashed', error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All feilds are required' })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        const passwordMatched = await bcrypt.compare(password, user.password)

        if (!passwordMatched) {
            res.status(401).json({ message: 'wrong password' })
        }

        res.status(200).json({ message: 'User Logged In' })
    } catch (error) {
        res.status(500).json({ message: 'Server crashed', error: error.message })
    }
}

export const getMe = (req , res) => {
    const authenticatedUser = req.user
    res.status(200).json({authenticatedUser})
}

export const logout = (req , res) => {
    res.clearCookie('token' , {
        httpOnly : true
    })

    res.status(200).json({message : 'User logged Out'})
}