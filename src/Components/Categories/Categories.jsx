import React from 'react'
import useCategories from '../../Hooks/useCategories'

export default function Categories() {
  const {allCat,catLoading} = useCategories()
  return <>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] m-auto gap-5 mt-20">
    {allCat?.data.data.map((cat)=>{
      return <div key={cat._id} className='hover:shadow-[#479747] transition-shadow duration-300 hover:shadow-lg border-2 border-gray-200 rounded-lg'>
      <img className='h-[400px] w-full' src={cat.image} alt="" />
      <h2 className='text-center text-3xl text-[#479747] py-5 border-t-2 border-gray-100'>{cat.name}</h2>
      </div>
    })}
  </div>
  </>
}
