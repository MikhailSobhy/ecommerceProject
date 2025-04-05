import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { numOfCartItems, getCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getCartItems();
    }
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="mb-24">
      <nav className="bg-[#F8F9FA] py-6 fixed top-0 left-0 right-0 z-20 shadow">
        <div className="w-[95%] md:w-[80%] m-auto flex justify-between items-center">
          <Link to="/" className="logo w-28">
            <img src={Logo} alt="Fresh Cart Logo" className="w-full" />
          </Link>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div
            className={`flex-col md:flex-row md:flex items-center gap-4 md:gap-12 absolute md:static top-[60px] left-0 w-full md:w-auto bg-[#F8F9FA] md:bg-transparent px-4 md:px-0 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${
              menuOpen ? "flex" : "hidden"
            }`}
          >
            {token && (
              <ul className="flex flex-col md:flex-row text-center gap-4 md:gap-6">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="wishlist">Wish-List</Link>
                </li>
                <li>
                  <Link to="cart">Cart : {numOfCartItems}</Link>
                </li>
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="categories">Categories</Link>
                </li>
                <li>
                  <Link to="brands">Brands</Link>
                </li>
              </ul>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              {token ? (
                <button onClick={logout}>Sign Out</button>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
