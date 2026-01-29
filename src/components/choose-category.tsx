"use client";

import Link from "next/link";
import { useGetCategories } from "@/api/getProducts";

const ChooseCategory = () => {
  const { result, loading, error } = useGetCategories();

  console.log("📊 DEBUG CATEGORIES:", {
    result,
    loading,
    error,
    tipoResult: typeof result,
    esArray: Array.isArray(result)
  });

  // Si hay un error
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        <h3 className="mb-8 text-3xl font-bold text-center sm:text-left">
          Elige una categoría
        </h3>
        <div className="text-red-500">
          Error cargando categorías: {error}
        </div>
      </section>
    );
  }

  // Convertir a array seguro
  const categories = Array.isArray(result) ? result : [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h3 className="mb-8 text-3xl font-bold text-center sm:text-left">
        Elige una categoría
      </h3>

      {loading ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[260px] sm:h-[360px] bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {categories
            .filter((category: any) => 
              category?.categoryName?.toLowerCase() !== "accesorios"
            )
            .map((category: any) => {
              // DEBUG: Ver qué hay en mainImage
              console.log(`🔍 ${category.categoryName}:`, {
                mainImage: category.mainImage,
                url: category.mainImage?.url,
                tipoUrl: typeof category.mainImage?.url
              });

              // LA SOLUCIÓN: Usa DIRECTAMENTE category.mainImage.url
              const imageUrl = category.mainImage?.url || "/placeholder-category.jpg";

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative h-[260px] sm:h-[360px] overflow-hidden rounded-xl shadow-md"
                >
                  {/* Debug overlay */}
                  <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-2 py-1 text-xs rounded">
                    {category.categoryName}
                  </div>

                  <img
                    src={imageUrl}
                    alt={category.categoryName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error(`❌ ERROR imagen ${category.categoryName}:`, {
                        url: e.currentTarget.src,
                        mainImage: category.mainImage,
                        expectedUrl: category.mainImage?.url
                      });
                      e.currentTarget.src = "/placeholder-category.jpg";
                    }}
                    onLoad={() => console.log(`✅ ${category.categoryName} cargada`)}
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50" />
                  
                  <p className="absolute bottom-4 left-0 right-0 text-center text-lg font-semibold text-white">
                    {category.categoryName}
                  </p>
                </Link>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default ChooseCategory;