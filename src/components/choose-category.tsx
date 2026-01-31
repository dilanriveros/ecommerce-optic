"use client";
/* eslint-disable @next/next/no-img-element */

import { useGetCategories } from "@/api/getProducts";
import Link from "next/link";
import { ResponseType } from "../../types/response";
import { CategoryType } from "../../types/category";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  // Si result no es array, usar array vacío
  const categories = Array.isArray(result) ? result : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h3 className="mb-8 text-3xl font-bold text-center sm:text-left">
        Elige una categoría
      </h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {loading ? (
          // Mostrar skeletons mientras carga
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="
                w-full 
                h-[380px] 
                sm:h-[460px] 
                bg-gray-200 
                rounded-xl 
                animate-pulse
              "
            />
          ))
        ) : categories.length > 0 ? (
          categories
            .filter(
              (category: CategoryType) =>
                category?.categoryName?.toLowerCase() !== "accesorios"
            )
            .map((category: CategoryType) => {
              const imageUrl = category?.mainImage?.url
                ? category.mainImage.url
                : "/placeholder-category.jpg";

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="
                    relative 
                    w-full 
                    h-[380px] 
                    sm:h-[460px] 
                    overflow-hidden 
                    rounded-xl 
                    shadow-md 
                    group
                  "
                >
                  <img
                    src={imageUrl}
                    alt={category.categoryName}
                    className="
                      w-full 
                      h-full 
                      object-cover 
                      transition-transform 
                      duration-500 
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

                  {/* Texto */}
                  <p className="
                    absolute 
                    bottom-5 
                    w-full 
                    py-2 
                    text-lg 
                    font-bold 
                    text-center 
                    text-white 
                    backdrop-blur-lg 
                    bg-black/30
                  ">
                    {category.categoryName}
                  </p>
                </Link>
              );
            })
        ) : (
          // Mostrar mensaje si no hay categorías
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">No hay categorías disponibles</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChooseCategory;