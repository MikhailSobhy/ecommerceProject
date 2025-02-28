import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishlistContext'
export default function ProductCard(props) {
  const {addToCart} = useContext(CartContext)
  const {addToWishlist,handleClick} = useContext(WishlistContext)
    const {_id,title,price,description,imageCover,ratingsAverage, category} = props.product
  return <>
  

 <div className="card rounded-3xl p-5 hover:shadow-lg hover:shadow-[#479747] transition-shadow duration-300 ">
    <Link to={`/details/${_id}`}>
        <div>
            <img src={imageCover} alt={description} />
             <span className='text-lime-400'>{category.name}</span>
            <h3 className='font-bold'>{title.split(" ").slice(0, 2).join(" ")}</h3>
            <div className='flex justify-between'>
            <span>{price} EGP</span>
            <span><i className="fa-solid fa-star text-yellow-400"></i> {ratingsAverage}</span>
         </div>
        </div>
        </Link>
        <div className='flex'>
        <button onClick={()=>{addToCart(_id)}}  className='w-3/4 h-10 m-auto bg-[#479747] text-white rounded-xl mt-5 block '>ADD</button>
        <button onClick={()=>{handleClick(_id)}} className=' text-black rounded-xl mt-5 block '><i className="fa-solid text- fa-heart text-4xl "></i></button>
        </div>
    </div>
  </>
}
