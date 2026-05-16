const express = require('express');
const router = express.Router();
const Register = require('../models/Register');
const Login = require('../models/Login');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
require('dotenv').config();



router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        } if (password.length < 6) return res.status(400).json({ message: "Password should be minimum of 6 characters" })
        const existed = await (Register.findOne({ email: email }))
        if (existed) {
            return res.status(400).json({ message: "User already exist, Please Login" });
        }
        const encryptedpass = await bcrypt.hash(password, 10);
        const newuser = await Register.create({
            email,
            password: encryptedpass
        });
        return res.status(200).json("User created successfully");
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error })

    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existed = await (Register.findOne({ email: email }))
        if (!existed) {
            return res.status(400).json({message:"User does not exist, Please Register First"});
        }
        const comparepass = await bcrypt.compare(password, existed.password);
        if (!comparepass) return res.status(404).json({ message: "Invalid Email or Password" });
        const token = jwt.sign({ id: existed._id }, (process.env.JWT_SECRET), { expiresIn: "1h" });

        res.cookie("token", token, {

            httpOnly: true,

            secure: true,

            sameSite: "none"

        });
        return res.status(200).json({message:"Successfully Logged in"});
    } catch (error) {
        console.log(error);

        return res.status(500).json({ error })

    }
})

router.get('/logout', (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: " loggd out sucessfully" });
    } catch (error) {

        return res.json(500).json({ message: "Internal server error occured" });
    }
})



router.get('/me', AuthMiddleware, async (req, res) => {
    const register = await Register.findById(req.userId);
    if (!register) {
        return res.status(404).json({ message: "Invalid and unauthorised" });
    }
    return res.status(200).json({ message: "authentication successful" });

})

router.get("/check-auth", AuthMiddleware, async (req, res) => {
    try {
        const user = await Register.findById(
            req.userId
        ).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            user
        });
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });

    }

});
module.exports = router
