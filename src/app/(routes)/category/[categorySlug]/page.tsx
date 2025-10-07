"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { useParams, useRouter } from "next/navigation";
import { ResponseType } from "../../../../../types/response";
import { Separator } from "@/components/ui/separator";
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "../../../../../types/product";
import { useState } from "react";
import ContactarFormula from "@/components/formula";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params;
const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug ?? "");

  const [filterStyle, setFilterStyle] = useState('');
  const router = useRouter();
console.log("category para ContactarFormula:", result?.[0]?.category ?? { categoryName: categorySlug });

  const filteredProducts =
    result != null && !loading &&
    (filterStyle === ''
      ? result
      : result.filter((product: ProductType) => product?.style === filterStyle));

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-24">
      {result != null && !loading && (
        <h1 className="text-3xl font-medium">
          {result[0]?.category.categoryName}
        </h1>
      )}
      {result != null && !loading && (
  <>
   
     <div className="flex justify-center mt-4 mb-6">
           <ContactarFormula category={result[0]?.category} />
     </div>
       </>
)}
      <Separator />
      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory setFilterStyle={setFilterStyle} />

        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}

          {filteredProducts != null && !loading &&
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}

          {filteredProducts != null && !loading && filteredProducts.length === 0 && (
            <p>No hay productos con este filtro.</p>
          )}
        </div>
      </div>
    </div>
  );
}
