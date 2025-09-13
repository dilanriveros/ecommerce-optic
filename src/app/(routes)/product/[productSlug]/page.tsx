"use client";
import { useGetProductBySlug } from "@/api/useGetProductBySlug";
import { ResponseType } from "../../../../../types/response"; 
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProducts from "./components/info-product";

export default function Page() {
  const params = useParams();
  const productSlug = params?.productSlug;

  // Validación segura
  if (!productSlug || Array.isArray(productSlug)) {
    return <p>Error: slug inválido</p>;
  }

  const { result }: ResponseType = useGetProductBySlug(productSlug);

  if (result == null) {
    return <SkeletonProduct />;
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div>
          <CarouselProduct images={result[0].images} />
        </div>
        <div className="sm:px-12">
          <InfoProducts product={result[0]} />
        </div>
      </div>
    </div>
  );
}
