/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";
import { ProductType } from "../../../../../types/product";
import { useCart } from "../../../../../hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CartItemProps {
  product: ProductType;
}

const CartItem = ({ product }: CartItemProps) => {
  const router = useRouter();
  const { removeItem } = useCart();

  return (
    <li className="flex py-6 border-b">
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="cursor-pointer"
      >
        <img
          src={product.images[0]?.url}
          alt={product.productName}
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
        />
      </div>

      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.productName}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>

          {product.category?.categoryName?.toLowerCase() !== "accesorios" && (
            <p className="px-2 py-1 mt-2 text-white bg-yellow-900 rounded-full w-fit">
              {product.style}
            </p>
          )}
        </div>

        <button
          onClick={() => removeItem(product.id)}
          className={cn(
            "rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition"
          )}
        >
          <X className="text-black" size={20} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
