/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import IconButton from "@/components/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "../../../../../hooks/use-cart";
import { ProductType } from "../../../../../types/product";
import { useState, useEffect } from "react";

type AccessoriesProductCardProps = {
  product: ProductType;
};

const AccessoriesProductCard = ({ product }: AccessoriesProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // DEBUG: Ver qué llega realmente
  useEffect(() => {
    console.log("🔥 ACCESSORIES DEBUG:", {
      productName: product.productName,
      imagesCount: product.images?.length || 0,
      images: product.images,
      primeraImagen: product.images?.[0],
      urlPrimeraImagen: product.images?.[0]?.url,
      tipoUrl: typeof product.images?.[0]?.url,
      esCloudinary: product.images?.[0]?.url?.includes('cloudinary')
    });
  }, [product]);

  // Helper para obtener URL segura
  const getSafeImageUrl = (url: string, imageId: number): string => {
    if (!url) return '/placeholder.jpg';
    
    // Si ya es URL completa
    if (url.startsWith('http')) return url;
    
    // Si es relativa, añadir backend
    if (url.startsWith('/')) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      return backendUrl ? `${backendUrl}${url}` : url;
    }
    
    return url;
  };

  // Si no hay imágenes
  if (!product.images || product.images.length === 0) {
    return (
      <div
        onClick={handleCardClick}
        className="relative p-3 transition-all duration-200 rounded-2xl hover:shadow-md cursor-pointer border border-zinc-200 dark:border-zinc-700"
      >
        <div className="w-full h-[250px] flex items-center justify-center bg-gray-100 rounded-xl">
          <span className="text-gray-500">Sin imágenes</span>
        </div>
        <p className="text-lg font-semibold text-center mt-4 text-zinc-800 dark:text-zinc-100 line-clamp-2">
          {product.productName}
        </p>
        <p className="font-bold text-center text-zinc-900 dark:text-white">
          {formatPrice(product.price)}
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="relative p-3 transition-all duration-200 rounded-2xl hover:shadow-md cursor-pointer border border-zinc-200 dark:border-zinc-700"
    >
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {product.images.map((image, index) => {
            const safeUrl = getSafeImageUrl(image.url, image.id || index);
            const hasError = imageErrors.has(image.id || index);
            
            return (
              <CarouselItem key={image.id ?? image.url} className="group relative">
                <div className="w-full h-[250px] flex items-center justify-center overflow-hidden rounded-xl">
                  {!hasError ? (
                    <img
                      src={safeUrl}
                      alt={`${product.productName} - Imagen ${index + 1}`}
                      className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error(`❌ Error imagen ${index}:`, {
                          urlOriginal: image.url,
                          urlProcesada: safeUrl,
                          product: product.productName,
                          imageId: image.id
                        });
                        setImageErrors(prev => new Set(prev).add(image.id || index));
                        e.currentTarget.src = '/placeholder.jpg';
                      }}
                      onLoad={() => console.log(`✅ Imagen ${index} cargada:`, product.productName)}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <span className="text-gray-500">Error de imagen</span>
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