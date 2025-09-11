/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import IconButton from "@/components/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "../../../../../hooks/use-cart";
import { ProductType } from "../../../../../types/product";

type AccessoriesProductCardProps = {
  product: ProductType;
};

const AccessoriesProductCard = ({ product }: AccessoriesProductCardProps) => {
  const router = useRouter();
  const { addItem } = useCart();

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative p-3 transition-all duration-200 rounded-2xl hover:shadow-md cursor-pointer border border-zinc-200 dark:border-zinc-700"
    >
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id} className="group relative">
              <div className="w-full h-[250px] flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                  alt={product.productName}
                  className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
                />
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
                        icon={<ShoppingCart size={20} className="text-black dark:text-black" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <p className="text-lg font-semibold text-center mt-4 text-zinc-800 dark:text-zinc-100 line-clamp-2">
        {product.productName}
      </p>
      <p className="font-bold text-center text-zinc-900 dark:text-white">{formatPrice(product.price)}</p>
    </div>
  );
};

export default AccessoriesProductCard;
