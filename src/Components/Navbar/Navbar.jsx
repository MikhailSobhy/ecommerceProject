import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { CartContext } from '../Context/CartContext'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const {numOfCartItems,getCartItems} = useContext(CartContext)
  const navigate = useNavigate()
  const {token,setToken} = useContext(AuthContext)

  useEffect(()=>{
    if(token){
      getCartItems()
    }
  },[token])

  function logout(){
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

return <div className='mb-24'>
  
<nav className='bg-[#F8F9FA] py-4 fixed top-0 left-0 right-0 z-20'>
  <div className="w-[95%] md:w-[80%] m-auto flex">
      <Link to={'/'} className="logo">
      <img src={Logo} alt="Fresh Cart Logo" />
      </Link>

      <div className={`links m-auto`}>
       {token?<ul className='flex space-x-4'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="wishlist">Wish-List</Link></li>
        <li><Link to="cart">Cart : {numOfCartItems}</Link></li>
        <li><Link to="products">Products</Link></li>
        <li><Link to="categories">Categories</Link></li>
        <li><Link to="brands">Brands</Link></li>
      </ul>:null}
      
      </div>

      <div className='space-x-4'>
      {token?<button onClick={logout}>Sign Out</button>:<><Link to="login">Login</Link>
      <Link to="register">Register</Link></>} 
     </div>
  </div>
    
  </nav>

  </div>
}
