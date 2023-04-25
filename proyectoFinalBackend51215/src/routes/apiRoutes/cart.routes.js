const express=require('express')
const cartManager = require('../../services/cartService')
const router=express.Router()

router.post('/',async(req,res)=>{

    try {
        const newCart=await cartManager.newCart()
        res.status(200).json({
            success:true,
            newCart:newCart
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

})
router.get('/:cid',async(req,res)=>{

    try {
        const {cid}=req.params
        const cartFound=await cartManager.getCartById(parseInt(cid))
        res.status(200).json({
            success:true,
            cart:cartFound
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

router.post('/:cid/product/:pid',async(req,res)=>{
    try {
        const {cid,pid}=req.params
        const cartModified=await cartManager.addProdToCart(parseInt(cid),parseInt(pid))
        res.status(200).json({
            success:true,
            cartModified:cartModified
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
  module.exports=router