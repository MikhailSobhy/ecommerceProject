import axios from 'axios'
import React, { createContext, useState } from 'react'
import CartContextProvider from './CartContext';
import toast from 'react-hot-toast';
export const WishlistContext = createContext()
export default function WishlistContextProvider({children}) {

    const [wishlistItems, setWishlistItems] = useState([])


    async function getWishlist() {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers:{
            token:localStorage.getItem('token')
        }})

        setWishlistItems(res.data.data)
    }

    async function addToWishlist(productId) {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers:
            {
                token:localStorage.getItem('token')
            }
        })

        setWishlistItems(res.data.data)
    }

    async function removeItem(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {headers:{
            token:localStorage.getItem('token')
        }})
        getWishlist()
    }


    function handleClick(id){
     
        if(wishlistItems.some((item)=> item.id == id)){
            removeItem(id)

            toast.success('Removed from wish list')
        }else{
            addToWishlist(id)

            toast.success('Added to wish list')
        }
    }
    

  return <WishlistContext.Provider value={{addToWishlist,getWishlist, wishlistItems,removeItem,handleClick}}>
    {children}
  </WishlistContext.Provider>
}
