const express=require("express")
const elecRouter= express.Router()

const jwt=require("jsonwebtoken")
const { electronicsModel }=require("../Models/electronics.model")

elecRouter.get("/",async(req,res)=>{
   

    try {
        let data=await electronicsModel.find(req.query)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
elecRouter.get("/sort1",async(req,res)=>{
   

    try {
        let data=await electronicsModel.find().sort({new_price:1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
elecRouter.get("/sort2",async(req,res)=>{
    

    try {
        let data=await electronicsModel.find().sort({new_price:-1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
elecRouter.get("/sort3",async(req,res)=>{
   

    try {
        let data=await electronicsModel.find().sort({description:1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

elecRouter.get("/sort4",async(req,res)=>{
   

    try {
        let data=await electronicsModel.find().sort({description:-1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})


elecRouter.delete("/delete/:Id", async (req, res) => {
    let  {Id } = req.params
    try {
        await NoteModel.findByIdAndDelete({ _id: Id })
        res.send({ "message": "Deleted succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while deleting" })
    }
})


module.exports={
    elecRouter
}