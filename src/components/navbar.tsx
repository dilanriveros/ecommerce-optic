"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import MenuList from "./ui/menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";

import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../../hooks/use-cart";

const Navbar = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cart = useCart()
  return (
    <header className="w-full bg-background sticky top-0 z-50 border-b shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 relative">
        {/* LOGO */}
        <button
          onClick={() => router.push("/")}
          className="flex-shrink-0 outline-none"
        >
          <Image
            src={
              mounted && resolvedTheme === "dark"
                ? "/logo-dark.png"
                : "/logo-light.png"
            }
            alt="Óptica Mirada Brillante"
            width={220}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </button>

        {/* FALSO ESPACIO IZQUIERDO EN MOBILE (para balancear la hamburguesa) */}
        <div className="sm:hidden w-[128px]" />

        {/* MENÚ HAMBURGUESA - Centrado SOLO en mobile */}
        <div className="sm:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ItemsMenuMobile />
        </div>

        {/* MENÚ DESKTOP */}
        <div className="hidden flex-1 items-center justify-center sm:flex">
          <MenuList />
        </div>

        {/* ICONOS DERECHA */}
        <div className="flex items-center gap-3 sm:gap-4 pl-4">
            {cart.items.length == 0 ? 
            <ShoppingCart
            strokeWidth="1"
            className="h-6 w-6 cursor-pointer"
            onClick={() => router.push("/cart")}
          />
            : (
              <div className="flex gap-1" onClick={() => router.push("/cart")}>
                  <BaggageClaim strokeWidth={1} className="cursor-pointer"/>
                  <span>{cart.items.length}</span>
              </div>

            )}
          
          <Heart
            strokeWidth="1"
            className="h-6 w-6 cursor-pointer"
            onClick={() => router.push("/loved-products")}
          />
          <User
            strokeWidth={1.2}
            className="h-6 w-6 cursor-pointer"
          />
          {mounted && <ToggleTheme />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
