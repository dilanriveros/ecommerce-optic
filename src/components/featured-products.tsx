"use client";
/* eslint-disable @next/next/no-img-element */

import { useGetFeaturedProducts } from "@/api/getFeaturedProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "./ui/card";
import { ProductType } from "../../types/product";
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useCart } from "../../hooks/use-cart";

const FeaturedProducts = () => {
  const router = useRouter();
  const { loading, result } = useGetFeaturedProducts();
  const { addItem } = useCart();

  // SOLUCIÓN: Convertir result a array si no lo es
  const productsArray = Array.isArray(result) ? result : [];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h3 className="mb-8 text-3xl font-bold text-center">
        Productos destacados
      </h3>

      <Carousel>
        <CarouselContent className="-ml-3 gap-x-3 lg:justify-center">
          {loading && <SkeletonSchema grid={3} />}

          {productsArray.map((product: ProductType) => {
            const { id, slug, images, productName, style, categoryName } =
              product;

            const imageUrl = images?.[0]?.url ?? null;

            return (
              <CarouselItem
                key={id}
                className="
                  pl-3
                  basis-full          /* MÓVIL: NO SE TOCA */
                  sm:basis-[50%]
                  lg:basis-[26%]      /* DESKTOP: tamaño original */
                "
              >
                <Card className="group border-gray-200">
                  <CardContent className="p-4">
                    {/* CUADRADO (MISMO TAMAÑO DE SIEMPRE) */}
                    <div
                      onClick={() => router.push(`/product/${slug}`)}
                      className="
                        relative
                        w-full
                        aspect-square
                        rounded-xl
                        bg-black/5
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        cursor-pointer
                      "
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={productName}
                          className="
                            w-[90%]
                            h-[90%]
                            object-contain
                            transition-transform
                            duration-300
                            group-hover:scale-105
                          "
                        />
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition">
                        <IconButton
                          onClick={() => router.push(`/product/${slug}`)}
                          icon={<Expand size={18} />}
                          className="bg-white text-black shadow"
                        />
                        <IconButton
                          onClick={() => addItem(product)}
                          icon={<ShoppingCart size={18} />}
                          className="bg-white text-black shadow"
                        />
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="pt-4 space-y-2">
                      <h3 className="text-base font-semibold line-clamp-1">
                        {productName}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {style && (
                          <span className="px-3 py-1 text-xs text-white bg-black rounded-full">
                            {style}
                          </span>
                        )}
                        {categoryName && (
                          <span className="px-3 py-1 text-xs text-white bg-yellow-900 rounded-full">
                            {categoryName}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4 hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;