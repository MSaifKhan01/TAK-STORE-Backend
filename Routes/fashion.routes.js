const express=require("express")
const FashionRouter= express.Router()

const jwt=require("jsonwebtoken")
const { FashionModel }=require("../Models/fashion.model")

FashionRouter.get("/",async(req,res)=>{
   

    try {
        let data=await FashionModel.find(req.query)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
FashionRouter.get("/sort1",async(req,res)=>{
   

    try {
        let data=await FashionModel.find().sort({new_price:1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
FashionRouter.get("/sort2",async(req,res)=>{
    

    try {
        let data=await FashionModel.find().sort({new_price:-1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
FashionRouter.get("/sort3",async(req,res)=>{
   

    try {
        let data=await FashionModel.find().sort({description:1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

FashionRouter.get("/sort4",async(req,res)=>{
   

    try {
        let data=await FashionModel.find().sort({description:-1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})


FashionRouter.delete("/delete/:Id", async (req, res) => {
    let  {Id } = req.params
    try {
        await NoteModel.findByIdAndDelete({ _id: Id })
        res.send({ "message": "Deleted succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while deleting" })
    }
})


module.exports={
    FashionRouter
}