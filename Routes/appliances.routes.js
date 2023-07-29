const express=require("express")
const AppliancesRouter= express.Router()

const jwt=require("jsonwebtoken")
const { applianceModel }=require("../Models/appliances.model")

AppliancesRouter.get("/",async(req,res)=>{
   

    try {
        let data=await applianceModel.find(req.query)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
AppliancesRouter.get("/sort1",async(req,res)=>{
   

    try {
        let data=await applianceModel.find().sort({new_price:1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
AppliancesRouter.get("/sort2",async(req,res)=>{
    

    try {
        let data=await applianceModel.find().sort({new_price:-1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
AppliancesRouter.get("/sort3",async(req,res)=>{
   

    try {
        let data=await applianceModel.find().sort({description:1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

AppliancesRouter.get("/sort4",async(req,res)=>{
   

    try {
        let data=await applianceModel.find().sort({description:-1})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})


AppliancesRouter.delete("/delete/:Id", async (req, res) => {
    let  {Id } = req.params
    try {
        await NoteModel.findByIdAndDelete({ _id: Id })
        res.send({ "message": "Deleted succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while deleting" })
    }
})

module.exports={
    AppliancesRouter
}