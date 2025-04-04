import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Order() {
    const {cartId,setNumOfCartItems}=useContext(CartContext)
    const [paymentMethod, setPaymentMethod] = useState()
   const navigate = useNavigate()
const vSchema = yup.object().shape({
    details: yup.string().required('The details is required'),
    phone: yup.string().required('Phone is required').matches(/^01[1250][0-9]{8}$/,'Egyptian phone number'),
    details: yup.string().required('The details is required').min(3,'Min is 3 chars').max(25,'Max is 25 chars')
})


async function cash(values){
    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{headers:{
        token: localStorage.getItem('token')
    }})
    console.log(res);
    if(res.data.status =='success'){
        setNumOfCartItems(0)
        toast.success('Payment Done')
    }

}

async function visa(values){
    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values,{headers:{
        token: localStorage.getItem('token')
}})
    console.log(res);
    window.open(res.data.session.url,'_blank')       
    
}
function payment(values){
    console.log(values);
    if(paymentMethod == 'cash'){
        cash(values)
        
    }else if(paymentMethod == 'visa'){
        visa(values)
        
    }
}

const formik = useFormik({
    initialValues:{
        shippingAddress:{
        details: '',
        phone: '',
        city: ''
        }
    },
    // validationSchema:vSchema,
    onSubmit:payment
    
})

  return <>
  
  

<form className="max-w-md mx-auto w-[95%] md:w-[80%]" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input onChange={(e)=>formik.setFieldValue('shippingAddress.details', e.target.value)} onBlur={formik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input onChange={(e)=>formik.setFieldValue('shippingAddress.phone', e.target.value)} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input onChange={(e)=>formik.setFieldValue('shippingAddress.city', e.target.value)} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>

<div>

  <button type='submit' onClick={()=>setPaymentMethod('cash')} className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cash</button>
  <button type='submit' onClick={()=>setPaymentMethod('visa')} className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 sm:mx-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Visa</button>
</div>
</form>


  </>
}
