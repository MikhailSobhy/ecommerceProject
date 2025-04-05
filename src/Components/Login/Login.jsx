import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [failMsg, setFailMsg] = useState(null);
  const { token, setToken } = useContext(AuthContext);

  const vSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please Enter valid Email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^[A-z0-9_]{6,30}$/, "from 6 to 30 chars"),
  });

  async function login(values) {
    setFailMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setSuccessMsg(res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setFailMsg(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema: vSchema,
  });
  return (
    <>
      <form
        className="max-w-md mx-auto py-5 w-[95%] md:w-[80%]"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            name="email"
            id="email1"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email1"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Danger alert! </span>
            {formik.errors.email}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Danger alert! </span>
            {formik.errors.password}
          </div>
        ) : null}

        <button
          type="submit"
          className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {successMsg ? <div className="text-blue-500">{successMsg}</div> : null}
        {failMsg ? <div className="text-red-500">{failMsg}</div> : null}

        <Link to="/forgetpassword" className="flex ">
          <button className="mt-2">Forget password ?</button>
        </Link>
      </form>
    </>
  );
}
