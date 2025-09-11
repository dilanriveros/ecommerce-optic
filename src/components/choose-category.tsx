"use client";
/* eslint-disable @next/next/no-img-element */

import { useGetCategories } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "../../types/response";
import { CategoryType } from "../../types/category";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige una categoría</h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {!loading &&
          Array.isArray(result) &&
          (result as CategoryType[])
            .filter((category) => category.categoryName.toLowerCase() !== "accesorios")
            .map((category) => {
              const imageUrl = category?.mainImage?.url
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`
                : "/placeholder-category.jpg";

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="relative mx-auto w-full max-w-[280px] h-[340px] sm:h-[400px] overflow-hidden rounded-lg bg-no-repeat bg-cover"
                >
                  <img
                    src={imageUrl}
                    alt={category.categoryName}
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-category.jpg";
                    }}
                  />
                  <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                    {category.categoryName}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default ChooseCategory;
