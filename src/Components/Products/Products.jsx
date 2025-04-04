import React from 'react'
import useProducts from '../../Hooks/useProducts'
import ProductCard from '../ProductCard/ProductCard'

export default function Products() {

  const {data,isLoading} = useProducts()
  
  return <>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-[90%] m-auto">
    {data?.data.data.map((prod)=>{return <ProductCard product = {prod} key={prod._id}/>})}
    </div>
  </>
}
