"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useGetCategories } from "@/api/getProducts";
import { ResponseType } from "../../types/response";
import { CategoryType } from "../../types/category";
import { getStrapiMedia, debugMedia } from "@/lib/image-utils"; // ← IMPORTA AQUÍ

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h3 className="mb-8 text-3xl font-bold text-center sm:text-left">
        Elige una categoría
      </h3>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {!loading &&
          Array.isArray(result) &&
          (result as CategoryType[])
            .filter(
              (category) =>
                category.categoryName?.toLowerCase() !== "accesorios"
            )
            .map((category) => {
              // DEBUG: Ver qué viene exactamente
              debugMedia(category.mainImage);
              
              // Obtiene la URL procesada
              const imageUrl = getStrapiMedia(category.mainImage);

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative h-[260px] sm:h-[360px] overflow-hidden rounded-xl shadow-md"
                >
                  <img
                    src={imageUrl}
                    alt={category.categoryName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error("❌ Image failed to load:", {
                        url: imageUrl,
                        category: category.categoryName,
                        rawMedia: category.mainImage
                      });
                      e.currentTarget.src = "/placeholder-category.jpg";
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                  {/* Texto */}
                  <p className="absolute bottom-4 left-0 right-0 text-center text-lg font-semibold text-white tracking-wide">
                    {category.categoryName}
                  </p>
                </Link>
              );
            })}
      </div>
    </section>
  );
};

export default ChooseCategory;