import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Context/CartContext'
import {Link} from 'react-router-dom'

export default function Cart() {
  
  const {getCartItems,allItems, updateItemCount,totalPrice,deleteSpecificItem,clearCart} = useContext(CartContext)
  useEffect(()=>{
    getCartItems()
  },[])

   
  
  return <>
  <div className='flex justify-between w-[80%] m-auto items-center'>
  <h2 className='text-2xl pl-3 flex '>Total Price Cart: <span className='text-green-500 ml-1'>{totalPrice}</span> </h2>
  <Link to='/order' className='px-5 py-3 text-2xl border-2 my-2 rounded-3xl text-green-500'>CHECK OUT</Link>
  </div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] m-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-black  bg-gray-300 uppercase">
      <tr>
        <th scope="col" className="px-16 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {allItems.map((item)=>{return <tr key={item.product.id} className="text-black bg-gray-300">
      <td className="p-4">
        <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
      </td>
      <td className="px-6 py-4 font-semibold text-black">
        {item.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button disabled={item.count == 1} onClick={()=>updateItemCount(item.product.id, item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>

          <div>
            <span>{item.count}</span>
          </div>

          <button onClick={()=>updateItemCount(item.product.id, item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only"></span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-green-500">
        {item.price * item.count} EGP
      </td>
      <td className="px-6 py-4">
        <button onClick={()=>deleteSpecificItem(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
      </td>
    </tr>  
      })}
    </tbody>
  </table>
      <div className='w-[100%] flex justify-center'>
      <button onClick={()=>clearCart()} className='px-5 py-3 text-2xl border-2 my-2 rounded-3xl text-green-500'>CLEAR YOUR CART</button>
      </div>
</div>





  </>
}
