import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext()
export default function CartContextProvider({children}) {
    const [allItems, setAllItems] = useState([])
    const [numOfCartItems, setNumOfCartItems] = useState()
    const [totalPrice,setTotalPrice] = useState()
    const [cartId, setCartId] = useState()

  async function addToCart(productId){
    try{
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
             headers:{
                 token:localStorage.getItem('token')
             }
         }
         )

         if(res.data.status == 'success'){
             toast.success('Added Successfully')
            }  
            setNumOfCartItems(res.data.numOfCartItems)

    }catch(err){
        toast.error('Something went wrong')
    }
        
    }

   async function getCartItems(){
    try{
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
             headers:{token:localStorage.getItem('token')}
         })

         if(res.data.status == 'success'){
            setAllItems(res.data.data.products)
            setTotalPrice(res.data.data.totalCartPrice)
            setNumOfCartItems(res.data.numOfCartItems)
            setCartId(res.data.cartId)
         }
    }catch(err){
        toast.error('Something went wrong')
    }
    }

    async function updateItemCount(id,count) {
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{headers:{
            token:localStorage.getItem('token')}
        })
        if(res.data.status == "success"){
            setAllItems(res.data.data.products)
        }
        setTotalPrice(res.data.data.totalCartPrice)
        setNumOfCartItems(res.data.numOfCartItems)
    }

    async function deleteSpecificItem(id){
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers:{
            token:localStorage.getItem('token')
        }})
        
        setAllItems(res.data.data.products)
        setTotalPrice(res.data.data.totalCartPrice)
        setNumOfCartItems(res.data.numOfCartItems)
    }

    async function clearCart() {
        const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers:{
            token: localStorage.getItem('token')
        }})

        setAllItems([])
        setTotalPrice(0)
        setNumOfCartItems(0)

    }

  return <CartContext.Provider value={{addToCart,clearCart, cartId,numOfCartItems, getCartItems,allItems, updateItemCount, totalPrice, deleteSpecificItem,setNumOfCartItems}}>
    {children}
  </CartContext.Provider>
}
