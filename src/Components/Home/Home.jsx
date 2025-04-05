import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider1 from "../../assets/images/slider-image-3.jpeg";
import Slider2 from "../../assets/images/slider-image-2.jpeg";
import Blog1 from "../../assets/images/blog-img-1.jpeg";
import Blog2 from "../../assets/images/blog-img-2.jpeg";
import useCategories from "../../Hooks/useCategories";
import useProducts from "../../Hooks/useProducts";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { allCat, catLoading } = useCategories();
  const { data, isLoading } = useProducts();
  return (
    <>
      <div className="grid grid-cols-12 w-[100%] md:grid-cols-6 md:w-1/2 m-auto mb-4 ">
        <div className="col-span-8 md:col-span-4 ">
          <Swiper slidesPerView={1} loop={true} style={{ height: "100%" }}>
            <SwiperSlide>
              <img className="w-full h-full block" src={Slider1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="w-full h-full block" src={Slider2} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="col-span-4 md:col-span-2">
          <img src={Blog1} className="h-1/2" alt="" />
          <img src={Blog2} className="h-1/2" alt="" />
        </div>
      </div>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {allCat?.data.data.map((cat) => {
          return (
            <SwiperSlide key={cat._id}>
              <div className="my-10">
                <img
                  src={cat.image}
                  className="h-[250px] w-full block"
                  alt=""
                />
                <div className="text-2xl font-bold">{cat.name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-[90%]  m-auto">
        {data?.data.data.map((prod) => {
          return <ProductCard product={prod} key={prod._id} />;
        })}
      </div>
    </>
  );
}
