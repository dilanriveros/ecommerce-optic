"use client";

import { Separator } from "@/components/ui/separator";
import { useCart } from "../../../../hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import CartItem from "./components/cart-item";
import { makePaymentRequest } from "@/api/payment";

export default function Page() {
  const { items, removeAll} = useCart();
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const handleBuy = async () => {
    try {
      const res = await makePaymentRequest.post("/orders", {
        amount: totalPrice,
        products: items,
      });

      const redirectUrl = res.data?.redirectUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("No se pudo generar el link de pago");
      }
      removeAll();
    } catch (error) {
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold">Carrito de Compras</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-slate-100 dark:bg-neutral-700 text-black dark:text-neutral-100">
            <p className="mb-3 text-lg font-semibold">Resumen del pedido</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Orden total</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              <Button className="w-full" onClick={handleBuy}>
                Comprar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
