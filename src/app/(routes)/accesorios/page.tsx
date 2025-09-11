// ✅ app/accessories/page.tsx
"use client";

import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { ResponseType } from "../../../../types/response";
import { Separator } from "@/components/ui/separator";
import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "../../../../types/product";
import AccessoriesProductCard from "./components/produc-cart";

export default function AccessoriesPage() {
  const slug = "accesorios"; // <- slug fijo para esta página
  const { result, loading }: ResponseType = useGetCategoryProduct(slug);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-24">
      {result != null && !loading && (
        <h1 className="text-3xl font-medium">
          {result[0]?.category.categoryName || "Accesorios"}
        </h1>
      )}
      <Separator />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
        {loading && <SkeletonSchema grid={3} />}

        {result != null && !loading &&
          result.map((product: ProductType) => (
            <AccessoriesProductCard key={product.id} product={product} />
          ))}

        {result != null && result.length === 0 && (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
