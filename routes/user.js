const express = require('express');
const jwt = require('jsonwebtoken');
const { UserModel, CoursesModel } = require('../db');
const bcrypt = require('bcrypt');
const { userMiddleware } = require('../auth/user');
const userRouter = express.Router();
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

userRouter.post('/signup', async (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
        name : name,
        email : email,
        password : hashedPassword
    })
    res.json({
        message : "Signup Successfully!"
    })
})

userRouter.post('/signin', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email
    })
    if(user)
    {
        const userFound = await bcrypt.compare(password, user.password);
        if(userFound){
            const token = jwt.sign({
                id : user._id
            }, JWT_USER_SECRET)
            res.set({
                'token' : token
            })
            res.json({
                message : "Signin Successfully",
            })
        }
        if(!userFound){
            res.json({
                message : "Incorrect Password"
            })
        }
    }
    if(!user){
        res.json({
            message : "Invalid Email"
        })
    }
})

userRouter.get("/courses/preview",async (req,res)=>{
    const courses = await CoursesModel.find({})
    if(courses){
        res.json({
            Courses : courses
        })
    }
})

module.exports = {
    userRouter : userRouter
}