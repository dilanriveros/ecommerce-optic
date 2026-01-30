/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { ProductType } from "../../../../../types/product";
import { useLovedProducts } from "../../../../../hooks/use-loved-products";
import { useCart } from "../../../../../hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = ({ product }: LovedItemProductProps) => {
  const router = useRouter();
  const { removeLovedItem } = useLovedProducts();
  const { addItem } = useCart();

  const addToCheckout = () => {
    addItem(product);
    removeLovedItem(product.id);
  };

  const isAccessory = product.category?.slug === "accesorios";
  
  // SOLUCIÓN AQUÍ ↓
  const rawUrl = product.images?.[0]?.url;
  let imageUrl = "/placeholder.png";
  
  if (rawUrl) {
    if (rawUrl.startsWith('/')) {
      // URL relativa → añadir backend
      imageUrl = `https://backend-ecommerce-optica.onrender.com${rawUrl}`;
    } else if (rawUrl.startsWith('//')) {
      // Cloudinary sin protocolo → añadir https:
      imageUrl = `https:${rawUrl}`;
    } else {
      // URL absoluta (Cloudinary) → usar tal cual
      imageUrl = rawUrl;
    }
  }

  return (
    <li className="flex py-6 border-b">
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={product.productName}
          className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
          onError={(e) => {
            console.error("❌ Error imagen LovedItem:", {
              url: imageUrl,
              raw: rawUrl,
              product: product.productName
            });
            e.currentTarget.src = "/placeholder.png";
          }}
        />
      </div>

      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.productName}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>

          {!isAccessory && (
            <div className="flex items-center gap-3">
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
            onClick={() => removeLovedItem(product.id)}
          >
            <X size={20} className="text-black" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default LovedItemProduct;