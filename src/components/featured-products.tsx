"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useGetFeaturedProducts } from "@/api/getFeaturedProducts";
import { ResponseType } from "../../types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "./ui/card";
import { ProductType } from "../../types/product";
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useCart } from "../../hooks/use-cart";
import { log } from "console";

const FeaturedProducts = () => {
  const router = useRouter();
  const { loading, result }: ResponseType = useGetFeaturedProducts();
  const {addItem} = useCart()
  
  
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}

          {result != null && result.map((product: ProductType) => {
            const { id, slug, images, productName, style, categoryName } = product;

            const firstImage = images?.data?.[0]?.attributes || images?.[0];
            const imageUrl = firstImage?.url
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${firstImage.url}`
              : null;

            return (
              <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                <div className="p-1">
                  <Card className="py-4 border-gray-200 shadow-none transition-shadow duration-300 group-hover:shadow-md">
                    <CardContent className="relative flex items-center justify-center px-6 py-2">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={productName || "Producto destacado"}
                          className="w-full h-64 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                          <span className="text-gray-500">Imagen no disponible</span>
                        </div>
                      )}

                      <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                        <div className="flex justify-center gap-x-6">
                          <IconButton
                            onClick={() => router.push(`product/${slug}`)}
                            icon={<Expand size={20} />}
                            className="text-gray-600"
                          />
                          <IconButton
                            onClick={() => addItem(product)}
                            icon={<ShoppingCart size={20} />}
                            className="text-gray-600"
                          />
                        </div>
                      </div>
                    </CardContent>

                    <div className="flex justify-between gap-4 px-8">
                      <h3 className="text-lg font-bold">{productName}</h3>
                      <div className="flex items-center justify-between gap-3">
                        {style && (
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {style}
                          </p>
                        )}
                        {categoryName && (
                          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {categoryName}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
