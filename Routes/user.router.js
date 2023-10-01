
const express = require('express');
const jwt = require('jsonwebtoken');
const { userModel } = require('../Models/user.model');
const bcrypt = require("bcrypt")
// const multer=require("multer")
const {passport}=require("../Config/Oauth")
const userRouter = express.Router()

userRouter.get("/homepage", async (req, res) => {

    res.status(200).send({ "msg": "HOME Page" })
})

userRouter.post("/register", async (req, res) => {
    const { name, email,mobile_No, password,  age} = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new userModel({ name, email,mobile_No, password: hash,  age})
            await user.save()
            res.status(200).send({ "msg": "registration done succesfully" })
        })

    } catch (err) {
        res.status(400).send({ "msg": "registration failed" })
    }

})
userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await userModel.findOne({email})
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "login succesfully","name":user.name,user, "token": jwt.sign({ "userID":user._id }, "jammi", { expiresIn: '3h' }) })
                } else {
                    res.status(400).send({ "msg": "login failed" })
                }
            })

        }

    } catch (err) {
        res.status(400).send({ "msg": err.massage })
    }

})

//  this route for logout

// userRouter.post('/logout', async (req, res) => {
//     const token = req.cookies.token;
//     console.log("********************************************************");
//     console.log(token);
//     console.log("********************************************************");
//     if (!token) {
//         return res.status(400).send({ msg: 'No token provided' });
//     }
//     try {
//         const isTokenBlacklisted = await logoutModel.findOne({
//             where: { token }
//         });
//         if (!isTokenBlacklisted) {
//             await logoutModel.create({ token });
//             res.clearCookie('token');
//             res.status(200).send({ msg: 'Logout successful' });
//         } else {
//             return res.status(401).send({ msg: 'Invalid token' });
//         }
//     } catch (error) {
//         return res.status(500).send({ msg: error.message });
//     }
// });


userRouter.get("/",async(req,res)=>{
    try {
        const user=await userModel.find()
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({msg:error.message})
    }
})

// this route for change password


userRouter.patch("/:email/reset",async(req,res)=>{
    try {
        const {email}=req.params
        const {currPass,newPass}=req.body

        const user =await userModel.findOne({email})
        // const user =await userModel.findOne({email})
        bcrypt.compare(currPass,user.password,async(err,result)=>{
            if(result){
                const newhashPassword=bcrypt.hashSync(newPass,5)
                const  Updateuserpass= await userModel.findByIdAndUpdate({_id:user._id},{password:newhashPassword})
                return res.status(201).send({msg:"Password Updated",ok:true})
            }else{
                return res.status(401).send({msg:"Wrong Current Password"})
            }
        })

    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})



//------------------- Google Auth Here -----------------------------------------
userRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  userRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    async function (req, res) {
        try {
            const fetch_user = await userModel.findOne({ email: req.user.email });
          
          
            if (fetch_user) {
                token_Generator(res, fetch_user.name, fetch_user._id , fetch_user.image);
            } else {
                bcrypt.hash("password", 2, async (err, hash) => {
                    const newUser = new userModel({
                        name: req.user.name,
                        email: req.user.email,
                        password: hash,
                        image : req.user.avtar
                    });
                    await newUser.save();
                   
                    token_Generator(res, req.user.name, "login with google",req.user.avtar);
                });
            }
        } catch (error) {
            res.status(500).send({ msg: "An error occurred while authenticating with Google" });
        }
    }
);

//---------------- Functions Here -----------------------------------

function token_Generator(res, name, id,image) {
    let token = jwt.sign(
        { user: name, userID: id ,role : "User" },
        "jammi",
        { expiresIn: "7d" }
    );
    let refreshToken = jwt.sign(
        { user: name, id: id },
        "jammi",
        { expiresIn: "12d" }
    );
    // res.cookie("token", token);
    res.redirect(`https://64c4ba3742477c42826723c1--cool-sherbet-bff1bb.netlify.app/index.html?token=${token}&username=${name}&image=${image}`)
    // res.status(202).json({ refreshToken });
  }
  










module.exports = { userRouter }

