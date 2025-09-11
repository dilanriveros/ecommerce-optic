"use client";

import { Separator } from "@/components/ui/separator";
import { ProductType } from "../../../../../../types/product";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCart } from "../../../../../../hooks/use-cart";
import { useLovedProducts } from "../../../../../../hooks/use-loved-products";
import { useRouter } from "next/navigation";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProducts = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { addLovedItem } = useLovedProducts();
  const router = useRouter();

  const handleBuy = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">
          {product.categoryName} {product.productName}
        </h1>
        <div className="flex items-center justify-between gap-3">
          <p className="px-2 py-1.5 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.style}
          </p>
        </div>
      </div>

      <Separator className="my-4" />
      {product.description}
      <Separator className="my-4" />
      <p className="my-4 text-xl">{formatPrice(product.price)}</p>

      <div className="flex items-center gap-5">
        <Button className="w-full" onClick={handleBuy}>
          Comprar
        </Button>
        <Heart
          width={30}
          strokeWidth={1}
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => addLovedItem(product)}
        />
      </div>
    </div>
  );
};

export default InfoProducts;
