import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function VerifyCode() {
    const navigate = useNavigate()
    async function resetCode(values) {
        try{

            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            console.log(res);
            toast.success(res.data.status)
            setTimeout(()=>{
                navigate('/resetpassword')
            },1000)
        }
        catch(err){
            toast.error('This verification code in incorrect')
        }
     
    }

    const formik = useFormik({
        initialValues:{
            resetCode:''
        },
        onSubmit:resetCode
    })
  
  return <>
  
  <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verification Code</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

  </>
}
