import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Error from './Components/Error/Error'
import AuthContextProvider from './Components/Context/AuthContext'
import CartContextProvider from './Components/Context/CartContext'
import Guard from './Components/Guard/Guard'
import AuthGuard from './Components/AuthGuard/AuthGuard'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Wishlist from './Components/Wishlist/Wishlist'
import { CartContext } from './Components/Context/CartContext'
import {Toaster} from 'react-hot-toast'
import WishlistContextProvider from './Components/Context/WishlistContext'
import Order from './Components/Order/Order'
import AllOrders from './Components/AllOrders/AllOrders'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'



const queryClient = new QueryClient()
const routes = createBrowserRouter([
  {path:'', element:<Layout/>,children:[
    {index:true, element:<Guard><Home/></Guard>},
    {path:'cart', element:<Guard><Cart/></Guard>},
    {path:'products', element:<Guard><Products/></Guard>},
    {path:'wishlist', element:<Guard><Wishlist/></Guard>},
    {path:'categories', element:<Guard><Categories/></Guard>},
    {path:'allorders', element:<Guard><AllOrders/></Guard>},
    {path:'order', element:<Guard><Order/></Guard>},
    {path:'brands', element:<Guard><Brands/></Guard>},
    {path:'details/:id', element:<Guard><ProductDetails/></Guard>},
    {path:'login', element:<AuthGuard><Login/></AuthGuard>},
    {path:'register', element:<AuthGuard><Register/></AuthGuard>},
    {path:'verifycode', element:<AuthGuard><VerifyCode/></AuthGuard>},
    {path:'resetpassword', element:<AuthGuard><ResetPassword/></AuthGuard>},
    {path:'forgetpassword', element:<AuthGuard><ForgetPassword/></AuthGuard>},
    {path:'*', element:<Error/>},
  ]}
])
export default function App() {

  return <>

  <AuthContextProvider>
  <WishlistContextProvider>
  <CartContextProvider>
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={routes}/>
       <Toaster position="top-center" reverseOrder={false}/>
    </QueryClientProvider>
   </CartContextProvider>
   </WishlistContextProvider>
 </AuthContextProvider>


  </>


}
