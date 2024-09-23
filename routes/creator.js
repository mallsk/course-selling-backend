const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_CREATOR_SECRET = process.env.JWT_CREATOR_SECRET;
const bcrypt = require("bcrypt");
const { CreatorModel, CoursesModel } = require("../db");
const { creatorMiddleware } = require("../auth/creator");

const creatorRouter = express.Router();

creatorRouter.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 5);
    await CreatorModel.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    res.json({
        message: "Signup Successfull",
    });
});

creatorRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const creatorUser = await CreatorModel.findOne({
        email: email,
    });
    if (creatorUser) {
        const creatorUserFound = await bcrypt.compare(
            password,
            creatorUser.password,
        );
        if (creatorUserFound) {
            const token = jwt.sign(
                {
                    id: creatorUser._id,
                },
                JWT_CREATOR_SECRET
            );
            res.json({
                message: "Signin Successfull",
                token: token,
            });
        }
        if (!creatorUserFound) {
            res.json({
                message: "Incorrect Password",
            });
        }
    }
    if (!creatorUser) {
        res.json({
            message: "Invalid Email",
        });
    }
});

creatorRouter.post("/course/create", creatorMiddleware , async (req,res)=>{
    const creatorId = req.creatorId;
    const { title, description, imageUrl, price } = req.body;

    const creatingCourse = await CoursesModel.create({
        title,
        description,
        creatorId,
        imageUrl,
        price
    })
    if(creatingCourse){
        res.json({
            message : "Course Created!",
            creatorId : creatorId
        })
    }

})

creatorRouter.get("/course/view", creatorMiddleware, async (req,res)=>{
    const creatorId = req.creatorId;
    let courseView = [];
    courseView = await CoursesModel.find(
        {
            creatorId : creatorId
        })
    if(courseView)
    {
        res.json({
            CreatedCourses : courseView
        })
    }
})

module.exports = {
    creatorRouter: creatorRouter,
};
