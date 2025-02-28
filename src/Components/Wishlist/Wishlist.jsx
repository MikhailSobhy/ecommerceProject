import React, { useContext, useEffect } from 'react'
import { WishlistContext } from '../Context/WishlistContext'
import { CartContext } from '../Context/CartContext'

export default function Wishlist() {
    const {addToCart} = useContext(CartContext)
    const {addToWishlist , getWishlist , wishlistItems,removeItem} = useContext(WishlistContext)
    useEffect(()=>{
        getWishlist()
    },[])

  return <>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] m-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase text-black  bg-gray-300">
            <tr className='text-center'>
                <th scope="col" className="px-16 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>

                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {wishlistItems.map((item, index)=>{ return <tr key={index} className=" border-b text-black  bg-gray-300">
                <td className="p-4 flex justify-center">
                    <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Item" />
                </td>
                <td className="px-6 py-4 font-semibold text-black text-center">
                    {item.title}
                </td>
                <td className="px-6 py-4 text-center text-black">
                    {item.price}
                </td>

                <td className="px-6 py-4 text-center">
                    <button onClick={()=>removeItem(item.id)} className="font-medium pr-6 text-red-600 dark:text-red-500 hover:underline">Remove</button>
                    <button onClick={()=>addToCart(item.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Add to cart</button>
      </td>
            </tr>
            })}

        </tbody>
    </table>
    </div>

  </>
}
