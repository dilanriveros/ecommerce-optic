/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import IconButton from "@/components/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "../../../../../hooks/use-cart";
import { ProductType } from "../../../../../types/product";
import { useState } from "react"; // Añade esto

type AccessoriesProductCardProps = {
  product: ProductType;
};

const AccessoriesProductCard = ({ product }: AccessoriesProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // FUNCIÓN CRÍTICA: Convierte cualquier URL a absoluta
  const getAbsoluteUrl = (url: string): string => {
    if (!url) return '/placeholder.jpg';
    
    // Si ya es URL completa (http://, https://, //)
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
      // Si empieza con //, añade https:
      return url.startsWith('//') ? `https:${url}` : url;
    }
    
    // Si es ruta relativa (/uploads/...)
    if (url.startsWith('/')) {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-ecommerce-optica.onrender.com';
      return `${BACKEND_URL}${url}`;
    }
    
    return url;
  };

  // Debug: Ver qué imágenes llegan
  console.log(`🛠️ AccessoriesProductCard - ${product.productName}:`, {
    imagesCount: product.images?.length,
    images: product.images?.map(img => ({
      url: img.url,
      tipo: typeof img.url,
      esRelativa: !img.url?.startsWith('http'),
      procesada: getAbsoluteUrl(img.url)
    }))
  });

  return (
    <div
      onClick={handleCardClick}
      className="relative p-3 transition-all duration-200 rounded-2xl hover:shadow-md cursor-pointer border border-zinc-200 dark:border-zinc-700"
    >
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {product.images.map((image, index) => {
            const imageUrl = getAbsoluteUrl(image.url);
            const imageKey = image.id || index;
            const hasFailed = failedImages.has(imageKey);

            return (
              <CarouselItem key={imageKey} className="group relative">
                <div className="w-full h-[250px] flex items-center justify-center overflow-hidden rounded-xl">
                  {!hasFailed ? (
                    <img
                      src={imageUrl}
                      alt={`${product.productName} - Imagen ${index + 1}`}
                      className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                      onLoad={() => console.log(`✅ ${product.productName} - Imagen ${index} cargada`)}
                      onError={(e) => {
                        console.error(`❌ ${product.productName} - Error imagen ${index}:`, {
                          urlOriginal: image.url,
                          urlProcesada: imageUrl,
                          esCloudinary: imageUrl.includes('cloudinary'),
                          esLocal: imageUrl.includes('/uploads/')
                        });
                        setFailedImages(prev => new Set([...prev, imageKey]));
                        e.currentTarget.src = '/placeholder.jpg';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <span className="text-gray-500 text-sm">Imagen no disponible</span>
                    </div>
                  )}

                  <div className="absolute bottom-5 left-0 w-full opacity-0 group-hover:opacity-100 transition px-6">
                    <div className="flex justify-center gap-6">
                      <div onClick={stopPropagation}>
                        <IconButton
                          onClick={() => router.push(`/product/${product.slug}`)}
                          icon={<Expand size={20} className="text-zinc-700 dark:text-black" />}
                        />
                      </div>

                      <div onClick={stopPropagation}>
                        <IconButton
                          onClick={() => addItem(product)}
                          icon={<ShoppingCart size={20} className="text-black" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <p className="text-lg font-semibold text-center mt-4 text-zinc-800 dark:text-zinc-100 line-clamp-2">
        {product.productName}
      </p>
      <p className="font-bold text-center text-zinc-900 dark:text-white">
        {formatPrice(product.price)}
      </p>
    </div>
  );
};

export default AccessoriesProductCard;