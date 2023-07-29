const express=require("express")
const cartRouter= express.Router()
const {cartModel}=require("../Models/cart.model")
const { applianceModel}=require("../Models/appliances.model")
const jwt=require("jsonwebtoken")
const { FashionModel } = require("../Models/fashion.model")
const { electronicsModel } = require("../Models/electronics.model")
const { auth } = require("../AuthMiddleware/Auth")

cartRouter.get('/',async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jammi")
    try{
        if(decoded){
            const notes=await cartModel.findOne({"userID":decoded.userID}).populate("Fashions.data").populate("electronics.data").populate("appliances.data")
            res.status(200).send(notes)
        }
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})

cartRouter.post("/Fashion/:id",auth, async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "jammi")
    const FashionID = req.params.id
    try {
      let cart = await cartModel.findOne({ userID: decoded.userID })
  
  
      const Fashion = await FashionModel.findById(FashionID)
  
      if (!cart) {
        cart = new cartModel({ userID: decoded.userID })
      }
  
      if (!Fashion) {
        return res.status(404).send({ "msg": "Fashion Not Found In DB" })
      }
  
      const isFashionInCart = cart.Fashions.some((ele) =>
        ele.data.equals(Fashion._id)
      )
     
  
      if (isFashionInCart) {
        return res.status(404).send({ "msg": "Product Already in the Cart" })
      }
  
      cart.Fashions.push({ data: FashionID, quantity: 1 });
  
      await cart.save()
      res.status(200).send({ "msg": "Product Added To Cart","ok":true, "data": cart })
  
  
  
    } catch (error) {
      res.status(400).send({ "msg": error.message })
  
    }
  })


  
cartRouter.post("/Electronics/:id",auth, async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "jammi")
    const ElectronicsID = req.params.id
    try {
      let cart = await cartModel.findOne({ userID: decoded.userID })
  
  
      const Electronics = await electronicsModel.findById(ElectronicsID)
      console.log(Electronics)
  
      if (!cart) {
        cart = new cartModel({ userID: decoded.userID })
      }
  
      if (!Electronics) {
        return res.status(404).send({ "msg": "Electronics Not Found In DB" })
      }
  
      const isElectronicsInCart = cart.electronics.some((ele) =>
        ele.data.equals(Electronics._id)
      )
     
  
      if (isElectronicsInCart) {
        return res.status(404).send({ "msg": "Product Already in the Cart" })
      }
  
      cart.electronics.push({ data: ElectronicsID, quantity: 1 });
  
      await cart.save()
      res.status(200).send({ "msg": "Product Added To Cart","ok":true, "data": cart })
  
  
  
    } catch (error) {
      res.status(400).send({ "msg": error.message })
  
    }
  })

  
cartRouter.post("/Appliances/:id",auth, async (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, "jammi")
    const AppliancesID = req.params.id
    try {
      let cart = await cartModel.findOne({ userID: decoded.userID })
  
  
      const Appliances = await applianceModel.findById(AppliancesID)
  
      if (!cart) {
        cart = new cartModel({ userID: decoded.userID })
      }
  
      if (!Appliances) {
        return res.status(404).send({ "msg": "Electronics Not Found In DB" })
      }
  
      const isAppliancesInCart = cart.appliances.some((ele) =>
        ele.data.equals(Appliances._id)
      )
      
  
      if (isAppliancesInCart) {
        return res.status(404).send({ "msg": "Product Already in the Cart" })
      }
  
      cart.appliances.push({ data: AppliancesID, quantity: 1 });
  
      await cart.save()
      res.status(200).send({ "msg": "Product Added To Cart","ok":true, "data": cart })
  
  
  
    } catch (error) {
      res.status(400).send({ "msg": error.message })
  
    }
  })


  cartRouter.patch("/inc/:itemId", async (req, res) => {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, "jammi");
      const cartId = req.params.id;
      const cart = await cartModel.findOne({ userID: decoded.userID })
      // console.log(cart);
      if (!cart) {
        return res.status(404).send({ "msg": "Cart Not Found" });
      }
  
      const itemId = req.params.itemId;
      let item = null;
  
      // Search for the item within sales
      item = cart.Fashions.find((ele) => ele._id.equals(itemId));
  
      // If the item is not found within sales, search within fleeces
      if (!item) {
        item = cart.electronics.find((ele) => ele._id.equals(itemId));
      }
  
      // If the item is not found within fleeces, search within rains
      if (!item) {
        item = cart.appliances.find((ele) => ele._id.equals(itemId));
      }
  
      if (!item) {
        return res.status(404).send({ "msg": "Item Not Found in Cart" });
      }
  
      item.Quantity += 1;
      await cart.save();
  
      res.status(200).send({ "msg": "Quantity Increased Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ "msg": error.message });
    }
  })


  cartRouter.patch("/dec/:itemId", async (req, res) => {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, "jammi");
      const cartId = req.params.id;
      const cart = await cartModel.findOne({ userID: decoded.userID })
      // console.log(cart);
      if (!cart) {
        return res.status(404).send({ "msg": "Cart Not Found" });
      }
  
      const itemId = req.params.itemId;
      let item = null;
  
      // Search for the item within sales
      item = cart.Fashions.find((ele) => ele._id.equals(itemId));
  
      // If the item is not found within sales, search within fleeces
      if (!item) {
        item = cart.electronics.find((ele) => ele._id.equals(itemId));
      }
  
      // If the item is not found within fleeces, search within rains
      if (!item) {
        item = cart.appliances.find((ele) => ele._id.equals(itemId));
      }
  
      if (!item) {
        return res.status(404).send({ "msg": "Item Not Found in Cart" });
      }
  
      item.Quantity -= 1;
      await cart.save();
  
      res.status(200).send({ "msg": "Quantity Increased Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ "msg": error.message });
    }
  })

  cartRouter.delete("/delete/:itemId",async (req,res)=>{
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, "jammi");
      const cartId = req.params.id;
      const cart = await cartModel.findOne({userID:decoded.userID});
    
      if (!cart) {
        return res.status(404).send({ "msg": "Cart Not Found" });
      }
    
      const itemId = req.params.itemId;
    
      let itemArray = null;
    
      // Find the item in the lipsticks array
      let itemIndex = cart.Fashions.findIndex((item) => item.data._id.equals(itemId));
      if (itemIndex !== -1) {
        itemArray = cart.Fashions;
      }
    
      // Find the item in the makeups array
      if (itemIndex === -1) {
        itemIndex = cart.electronics.findIndex((item) => item.data._id.equals(itemId));
        if (itemIndex !== -1) {
          itemArray = cart.electronics;
        }
      }
    
      // Find the item in the  skincares array
      if (itemIndex === -1) {
        itemIndex = cart.appliances.findIndex((item) => item.data._id.equals(itemId));
        if (itemIndex !== -1) {
          itemArray = cart.appliances;
        }
      }
    
      if (itemIndex === -1) {
        return res.status(404).send({ "msg": "Item Not Found in Cart" });
      }
    
      // Remove the item from the item array
      itemArray.splice(itemIndex, 1);
      await cart.save();
    console.log("hi")
      res.status(200).send({ "msg": "Item Removed Successfully" });
    } catch (error) {
      res.status(400).send({ "msg": error.message });
    }
   
    
  })


module.exports={
    cartRouter
}