const express=require('express')
const router=express.Router()
const productRoutes=require('./apiRoutes/products.routes')
const cartRoutes=require('./apiRoutes/cart.routes')

router.get('/health',(_req,res)=>{
    res.status(200).json({
        health:'up',
        success:true,
        environment:process.env.ENVIRONMENT,
    })
}).use('/api',productRoutes)
.use('/api/carts',cartRoutes)

module.exports=router