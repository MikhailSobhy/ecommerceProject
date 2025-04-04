import React, { useContext, useEffect } from 'react'
import { WishlistContext } from '../Context/WishlistContext'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Wishlist() {
    const {addToCart} = useContext(CartContext)
    const {addToWishlist , getWishlist , wishlistItems,removeItem} = useContext(WishlistContext)
    useEffect(()=>{
        getWishlist()
    },[])

  return <>
            {wishlistItems.map((item, index)=>{ return <div key={index} className='border-2 border-gray-300 grid grid-cols-12 w-[95%] md:w-[80%] m-auto text-black bg-gray-200'>
            <div className='col-span-2 p-2'>
             <Link to={`/details/${item._id}`}><img src={item.imageCover} className=" max-w-full max-h-full" /></Link>
            </div>
            <div className='col-span-6 flex flex-col my-2 sm:my-10 p-2 justify-center'>
                <div className='text-sm md:text-base'>{item.title.split(" ").slice(0, 2).join(" ")}</div>
                <div className='text-sm md:text-base text-green-500'>{item.price} EGP</div>
            </div>
            <div className='col-span-4 flex flex-col sm:flex-row justify-center items-center'>
                 <button onClick={()=>removeItem(item.id)} className="text-sm md:text-base  text-red-600 hover:underline">Remove</button>
                 <button onClick={()=>addToCart(item.id)} className="text-sm md:text-base ml-2 text-green-600 hover:underline">Add to cart</button>
            </div>
         </div>
            })}
  </>
}

// 
// {item.title}
// {item.price}

// <button onClick={()=>removeItem(item.id)} className="font-medium pr-6 text-red-600 dark:text-red-500 hover:underline">Remove</button>
// 