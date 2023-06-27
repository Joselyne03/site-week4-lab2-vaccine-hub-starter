const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req,res,next) => {
    try {
        //takes in the user email and password and tries to authenticate them
        const user = await User.login(req.body)
        return res.status(200).json({user})
    } catch (err){
        next(err)
    }
})
router.post("/register", async (req,res,next) => {
    try {
        //takes in the user email and password, their date and time 
        //will create a new user with their appoinment info
        const user = await User.register(req.body)
        return res.status(201).json({user})
    } catch (err){
        next(err)
    }
})

module.exports = router