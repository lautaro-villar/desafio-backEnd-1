const express=require('express')
const router=express.Router()
const productManager=require('../../services/productServices')

router.get('/',async(req,res)=>{
    try {
        const limit=req.query.limit
        const productos=await productManager.getProducts()
        if(!limit){
            return res.status(200).json({
                success:true,
                productos:productos
            })
        }
        const productosFiltrados=productos.slice(0,limit)
        res.status(200).json({
            success:true,
            productos:productosFiltrados
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
router.get('/products/:pid',async(req,res)=>{
    try {
        const {pid}=req.params
        const productFound=await productManager.getProdById(parseInt(pid))
        if(!productFound){
            return res.status(404).json({
                success:false,
                message:'no se encontro el producto'
            })
        }
        res.status(200).json({
            success:true,
            producto:productFound
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

router.post('/',async (req,res)=>{

    try {
        const {title, description, code, price, stock, thumbnail}=req.body
        const nuevoProd={
            title, description, code, price, stock, thumbnail
        }
        const prodAgregado=await productManager.addProd(nuevoProd)
        res.status(200).json({
            success:true,
            prodAdded:prodAgregado
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

router.put('/:pid',async(req,res)=>{
    try {
        const {pid}=req.params
        const {title, description, code, price, stock, thumbnail,status}=req.body
        const nuevoProd={
            title, description, code, price, stock, thumbnail,
            status
        }
        const prodModificado=await productManager.updateProd(parseInt(pid),nuevoProd)
        res.status(200).json({
            success:true,
            prodModified:prodModificado
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

})

router.delete('/:pid',async(req,res)=>{
    try {
        const {pid}=req.params
        const prodEliminado=await productManager.deleteProdById(parseInt(pid))
        res.status(200).json({
            success:true,
            deleted:prodEliminado
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

})
module.exports=router