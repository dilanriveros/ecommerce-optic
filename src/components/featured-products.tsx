"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useGetFeaturedProducts } from "@/api/getFeaturedProducts";
import { ResponseType } from "../../types/response";
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
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const { addItem } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h3 className="mb-8 text-3xl font-bold">
        Productos destacados
      </h3>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {Array.isArray(result) &&
            result.map((product: ProductType) => {
              const {
                id,
                slug,
                images,
                productName,
                style,
                categoryName,
              } = product;

              const firstImage = images?.[0];
              const imageUrl = firstImage?.url ?? null;

              return (
                <CarouselItem
                  key={id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="group h-full border-gray-200 transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="relative flex items-center justify-center p-6">
                      <div
                        className="relative w-full h-64 cursor-pointer"
                        onClick={() => router.push(`/product/${slug}`)}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={productName || "Producto destacado"}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
                            <span className="text-sm text-gray-500">
                              Imagen no disponible
                            </span>
                          </div>
                        )}

                        {/* Overlay hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

                        {/* Botones */}
                        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-6 opacity-0 group-hover:opacity-100 transition">
                          <IconButton
                            onClick={() => router.push(`/product/${slug}`)}
                            icon={<Expand size={20} />}
                            className="bg-white text-black shadow"
                          />
                          <IconButton
                            onClick={() => addItem(product)}
                            icon={<ShoppingCart size={20} />}
                            className="bg-white text-black shadow"
                          />
                        </div>
                      </div>
                    </CardContent>

                    {/* Info producto */}
                    <div className="px-6 pb-6 space-y-3">
                      <h3 className="text-lg font-semibold line-clamp-1">
                        {productName}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {style && (
                          <span className="px-3 py-1 text-xs font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">
                            {style}
                          </span>
                        )}
                        {categoryName && (
                          <span className="px-3 py-1 text-xs font-medium text-white bg-yellow-900 rounded-full">
                            {categoryName}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
        </CarouselContent>

        <CarouselPrevious className="-left-3" />
        <CarouselNext className="-right-3 hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;
