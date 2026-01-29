"use client";

import Link from "next/link";
import { useGetCategories } from "@/api/getProducts";

const ChooseCategory = () => {
  const { result, loading, error } = useGetCategories();

  // Debug: Ver qué viene realmente
  console.log("📊 RESULT:", {
    resultado: result,
    tipo: typeof result,
    esArray: Array.isArray(result),
    longitud: Array.isArray(result) ? result : "no es array"
  });

  // Convertir result a array si no lo es
  const categories = Array.isArray(result) ? result : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h3 className="mb-8 text-3xl font-bold text-center sm:text-left">
        Elige una categoría
      </h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error cargando categorías: {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {!loading && categories
          .filter((category: any) => 
            category?.categoryName?.toLowerCase() !== "accesorios"
          )
          .map((category: any) => {
            // EXTRAER URL DE MANERA SEGURA
            let imageUrl = "/placeholder-category.jpg";
            
            if (category?.mainImage) {
              if (typeof category.mainImage === 'string') {
                imageUrl = category.mainImage;
              } else if (category.mainImage.url) {
                imageUrl = category.mainImage.url;
              }
            }

            console.log(`🔍 ${category.categoryName}:`, {
              imagen: category.mainImage,
              urlUsada: imageUrl
            });

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
                    console.error(`❌ Error imagen: ${category.categoryName}`);
                    e.currentTarget.src = "/placeholder-category.jpg";
                  }}
                />
                
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50" />
                
                <p className="absolute bottom-4 left-0 right-0 text-center text-lg font-semibold text-white">
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