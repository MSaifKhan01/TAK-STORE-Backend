const express=require("express")
const payRouter= express.Router()
const {payModel}=require("../Models/pay.model")

const jwt=require("jsonwebtoken")



payRouter.post("/add", async(req,res)=>{
    try{
    const note=new payModel(req.body)
    await note.save()
    res.status(200).send({"Msz":"A New Note has been added"})
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})


module.exports={
    payRouter
}