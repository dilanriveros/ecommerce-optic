import { useRouter } from "next/navigation";
import { ProductType } from "../../../../../types/product";
import { useLovedProducts } from "../../../../../hooks/use-loved-products";
import { useCart } from "../../../../../hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface lovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = ({ product }: lovedItemProductProps) => {
  const router = useRouter();
  const { removeLovedItem } = useLovedProducts();
  const { addItem } = useCart();

  const addToCheckout = () => {
    addItem(product);
    removeLovedItem(product.id);
  };

  const isAccessory = product.category?.slug === "accesorios"; // Cambia el slug si es diferente

  return (
    <li className="flex py-6 border-b">
      <div onClick={() => router.push(`/product/${product.slug}`)}>
        <img
          src={`${product.images[0]?.url}`}
          alt="Product"
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
        />
      </div>
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.productName}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>

          {!isAccessory && (
            <div className="flex items-center justify-between gap-3">
              <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full w-fit">
                {product.style}
              </p>
            </div>
          )}

          <Button className="mt-5 rounded-full" onClick={addToCheckout}>
            Añadir al carrito
          </Button>
        </div>

        <div>
          <button
            className={cn(
              "rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition"
            )}
          >
            <X
              size={20}
              className="text-black dark:text-black"
              onClick={() => removeLovedItem(product.id)}
            />
          </button>
        </div>
      </div>
    </li>
  );
};

export default LovedItemProduct;
