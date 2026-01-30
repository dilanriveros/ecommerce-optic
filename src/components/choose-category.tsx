"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useGetCategories } from "@/api/getProducts";  // ✅ IMPORT CORRECTO
import { ResponseType } from "../../types/response";
import { CategoryType } from "../../types/category";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  // DEBUG: Ver qué llega
  console.log("🎯 ChooseCategory - Result:", result);
  
  // Asegurar que result sea array
  const categories = Array.isArray(result) ? result : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h3 className="mb-8 text-3xl font-bold text-center sm:text-left">
        Elige una categoría
      </h3>

      {!loading && categories.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay categorías disponibles</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {!loading &&
          categories
            .filter(
              (category: CategoryType) =>
                category.categoryName?.toLowerCase() !== "accesorios"
            )
            .map((category: CategoryType) => {
              console.log("📸 Categoría:", category); // DEBUG
              
              // ✅ EXTRACCIÓN CORRECTA DE IMAGEN PARA STRAPI v4
              let imageUrl = "/placeholder-category.jpg";
              
              // Opción 1: Si la imagen viene en mainImage.url (estructura plana)
              if (category.mainImage?.url) {
                imageUrl = category.mainImage.url;
              }
              // Opción 2: Si viene en mainImage.data.attributes.url (Strapi v4)
              else if (category.mainImage?.data?.attributes?.url) {
                imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${category.mainImage.data.attributes.url}`;
              }
              // Opción 3: Si viene directo en attributes
              else if (category.attributes?.mainImage?.data?.attributes?.url) {
                imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${category.attributes?.mainImage.data.attributes?.url}`;
              }

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative h-[260px] sm:h-[360px] overflow-hidden rounded-xl shadow-md"
                >
                  <img
                    src={imageUrl}
                    alt={category.categoryName || "Categoría"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback si la imagen falla
                      console.error("❌ Error cargando imagen:", imageUrl);
                      (e.target as HTMLImageElement).src = "/placeholder-category.jpg";
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