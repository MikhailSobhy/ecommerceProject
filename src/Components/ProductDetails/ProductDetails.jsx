import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../Context/CartContext";
export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();
  function getSpecificProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["details", id],
    queryFn: getSpecificProduct,
  });

  let details = data?.data.data;

  return (
    <>
      <div className="grid grid-cols-6 w-[80%] m-auto">
        <div className="col-span-6 sm:col-span-2">
          <img src={details?.imageCover} alt="" />
        </div>
        <div className="ps-5 col-span-6 sm:col-span-4 flex flex-col justify-center">
          <span className="text-lime-400 mb-2">{details?.title}</span>
          <h3 className="font-bold mb-2">{details?.description}</h3>
          <div className="flex justify-between">
            <span>{details?.price} EGP</span>
            <span>
              <i className="fa-solid fa-star text-yellow-400"></i>{" "}
              {details?.ratingsAverage}
            </span>
          </div>
          <div>
            <button
              onClick={() => addToCart(id)}
              className="w-1/2 h-10 m-auto bg-[#479747] text-white rounded-xl mt-5 block "
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
