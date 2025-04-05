import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[80%] m-auto gap-5">
        {data?.data.data.map((brand) => {
          return (
            <div
              key={brand._id}
              className="hover:shadow-[#479747] transition-shadow duration-300 hover:shadow-lg border-2 border-gray-200 rounded-lg"
            >
              <img className="h-[200px] w-full" src={brand.image} alt="" />
              <h2 className="text-center text-xl py-5 border-t-2 border-gray-100">
                {brand.name}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
}
