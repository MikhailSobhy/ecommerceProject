import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Context/CartContext'
import {Link} from 'react-router-dom'

export default function Cart() {
  
  const {getCartItems,allItems, updateItemCount,totalPrice,deleteSpecificItem,clearCart} = useContext(CartContext)
  useEffect(()=>{
    getCartItems()
  },[])

   
  
  return <>
  <div className='flex justify-between w-[95%] md:w-[80%] m-auto items-center'>
    <h2 className='text-lg md:text-2xl flex '>Total Price Cart: <span className='text-green-500 ml-1'>{totalPrice} EGP</span> </h2>
    <Link to='/order' className='px-5 py-3 text-base md:text-xl border-2 my-2 rounded-3xl text-green-500'>CHECK OUT</Link>
  </div>


      {allItems.map((item)=>{return <div key={item.product.id} className="border-2 border-gray-300 grid grid-cols-12 w-[95%] md:w-[80%] m-auto text-black bg-gray-200">
        
                <div className='col-span-2 p-2'>
                <Link to={`/details/${item.product.id}`}><img src={item.product.imageCover} className=" max-w-full max-h-full" /></Link>
                </div>
                <div className='col-span-6 flex flex-col sm:my-10 p-2 justify-between'>
                  <div className='text-sm md:text-base'>{item.product.title.split(" ").slice(0, 2).join(" ")}</div>
                  <div className='text-sm md:text-base text-green-500'>{item.price * item.count} EGP</div>
                  <div className='text-sm md:text-base'>
                    <button onClick={()=>deleteSpecificItem(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
        
        <div className='col-span-4 flex items-center justify-center p-2'>
          <div className="flex items-center">
            <button disabled={item.count == 1} onClick={()=>updateItemCount(item.product.id, item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  " type="button">
             <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>

         <div>
          <span className='text-gray-700'>{item.count}</span>
          </div>
            <button onClick={()=>updateItemCount(item.product.id, item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
              <span className="sr-only"></span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
        </div>
        </div>

    </div>  
      })}
  
  
      <div className='w-[100%] flex justify-center'>
      <button onClick={()=>clearCart()} className='px-5 py-3 mt-6 text-base md:text-xl border-2 my-2 rounded-3xl text-green-500'>CLEAR YOUR CART</button>
      </div>


  </>
}
