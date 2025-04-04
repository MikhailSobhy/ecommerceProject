import React from 'react'
import amazon from '../../assets/images/amazon-pay.png'
import express from '../../assets/images/American-Express-Color.png'
import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import appstore from '../../assets/images/get-apple-store.png'
import googleplay from '../../assets/images/get-google-play.png'
 



export default function Footer() {


  return <div className='bg-[#F8F9FA] pt-8 pb-12 mt-5'>
    <div className='w-[95%] md:w-[80%] m-auto'>
      <div className=''>
         <h2 className='text-2xl'>Get the FreshCart app</h2>
         <p className='text-gray-500 my-3'>We will send you a link, open it on your phone to download the app.</p>
      <div className='flex justify-between flex-col md:flex-row mb-5'>
         <input type="email" id="email" className="border border-gray-300 text-sm rounded-lg w-[100%] md:w-[75%] p-2.5 placeholder-gray-500 focus:border-lime-500 mr-2" placeholder="Email .." required />
         <button className='px-6 py-2 w-[50%] mt-3 md:mt-0 md:w-[25%] lg:w-[20%] bg-[#479747] text-white rounded-md'>Share App Link</button>
      </div>
      </div>
      <hr />
      <div className='flex justify-between my-5'>
          <div className='flex items-center space-x-4 flex-col lg:flex-row space-y-3 lg:space-y-0'>
            <span className='mb-2 lg:mb-0'>Payment Partners</span>
            <img className='mx-2 w-[80px] h-[20px]' src={amazon} alt="Amazon Logo" />
            <img className='mx-2 w-[50px]' src={express} alt="Express Logo" />
            <img className='mx-2 w-[50px]' src={mastercard} alt="Mastercard Logo" />
            <img className='mx-2 w-[50px]' src={paypal} alt="Paypal Logo" />
          </div>
          <div className='flex items-center flex-col lg:flex-row space-y-3 lg:space-y-0'>
            <span className='mb-2 lg:mb-0'>Get Deliveries with FreshCart</span>
            <img className='mx-2 w-[80px] h-[25px]' src={appstore} alt="App store Logo" />
            <img className='mx-2 w-[80px] h-[25px]' src={googleplay} alt="Google play Logo" />
          </div>
      </div>
      <hr />
    </div>
  </div>
}
