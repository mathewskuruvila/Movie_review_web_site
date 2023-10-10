const express = require('express');
const user = require('../models/userSchema')
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const bcrypt = require("bcrypt")


module.exports = {
    register:async (req, res) => {
        try {
            const { fullName, email, password, phone, confirmPassword } = req.body
            if (fullName !== null && email !== null && phone !== null && password !== null) {
                if (password === confirmPassword) {
                    const userExist = await user.findOne({ email: email })
                    if (!userExist) {
                            const emailValid = emailRegex.test(email)
                            if (emailValid) {
                                const bcryptPassword = await bcrypt.hash(password, 10)
                                const newUser = new user({
                                    fullName, email, phone, password: bcryptPassword
                                })
                                await newUser.save()
                                console.log(newUser,"newUser");
                                res.status(200).json({ message: "User created successfully", userId: newUser.id})
                            } else {
                                res.status(400).json({ message: "Invalid Email" })
                            }
                    } else {
                        return res.status(400).json({ message: "User already exist" })
                    }
                } else {
                    res.status(400).json({ message: "Passwords do not match" })
                }
            } else {
                return res.status(400).json({ message: "Please fill all fields" })
            }
        } catch (error) {
            return res.status(500).json({ message: "server error" })
        }
    },
    login:async (req, res) => {
        try {
            console.log("hai888888888");
            const { email, password } = req.body
            console.log(req.body);
            if (email !== null && password !== null) {
                const emailValid = emailRegex.test(email)
                if (emailValid) {
                    const userData = await user.findOne({email})
                    if (userData) {
                            if (await bcrypt.compare(password,userData.password)) {
                                res.status(200).json({ message: "Login successful", userId:userData.id })
                            } else {
                                res.status(400).json({ message: "Invalid password" })
                            }
                    } else {
                        console.log("hello");
                        res.status(400).json({ message: "Invalid email" })
                    }
                } else {
                    res.status(400).json({ message: "Invalid email" })
                }
            } else {
                res.status(400).json({ message: "Please fill all fields" })
            }
        } catch (error) {
            return res.status(500).json({ message: "server error" })
        }
    }

}