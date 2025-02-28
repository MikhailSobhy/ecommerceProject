import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AllOrders() {
    const [orders,setOrders] = useState()
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)

    async function getUserOrders() {
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`)
        setOrders(res.data)
    }
    useEffect(()=>{
      getUserOrders()
    },[])
  return <>
  
    {orders?.map((order)=>{return <div key={order.id}>
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] m-auto mb-5">
    <table className="w-full text-sm rtl:text-right text-gray-500 text-center dark:text-gray-400">
        <thead className="text-xs text-black  bg-gray-300">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Order#
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Payment Method
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="border-b text-black  bg-gray-300">
                <td className="px-6 py-4">
                    {order.id}
                </td>
                <td className="px-6 py-4">
                    {order.totalOrderPrice} EGP
                </td>
                <td className="px-6 py-4">
                    {order.paymentMethodType}
                </td>
            </tr>

        </tbody>
    </table>
</div>


    </div>})}

  </>
}
