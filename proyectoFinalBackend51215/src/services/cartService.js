const fs=require('fs')
class CartManager{
    constructor(ruta){
        this.ruta=ruta
    }
    async newCart(){
        try {
            const data=await fs.promises.readFile(this.ruta,'utf-8')
            const jsonData=JSON.parse(data)
            const id=jsonData.length+1 
            const newCart={id:id,productos:[]}
            jsonData.push(newCart)
            await fs.promises.writeFile(this.ruta,JSON.stringify(jsonData,null, 2))
    
            return newCart
        } catch (error) {
            console.error(error)
        }

    }
    async getCartById(id){

        try {
            const data=await fs.promises.readFile(this.ruta,'utf-8')
            const jsonData=JSON.parse(data)
            const cartFound=jsonData.find(item=>item.id===id)
            if(!cartFound){
                console.log('no existe tal carrito')
                return
            }
            return cartFound
        } catch (error) {
            console.log(error)
        }


    }
    async addProdToCart(cid,pid){
        try {
            const data=await fs.promises.readFile(this.ruta,'utf-8')
            const jsonData=JSON.parse(data)
            const cartFound=jsonData.find(item=>item.id===cid)
            if(!cartFound){
                console.log('cart not found')
                return
            }
            const prodEnCart=cartFound.productos.find(item=>item.producto===pid)
            if(!prodEnCart){
                cartFound.productos.push({producto:pid,quantity:1})
                await fs.promises.writeFile(this.ruta,JSON.stringify(jsonData,null, 2))
                return cartFound
            }
            prodEnCart.quantity=prodEnCart.quantity+1
            await fs.promises.writeFile(this.ruta,JSON.stringify(jsonData,null, 2))
            return cartFound
        } catch (error) {
            console.error(error)
        }

    }
}

const cartManager=new CartManager('./carts.txt')

module.exports=cartManager