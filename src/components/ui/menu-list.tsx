"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Armazones",
    href: "/category/armazones",
    description:
      "Variedad de estilos y materiales en armazones para todos los gustos y necesidades.",
  },
  {
    title: "Lentes de contacto",
    href: "/category/lentes-de-contacto",
    description:
      "Lentes cómodos y de alta calidad para corrección visual sin necesidad de armazones.",
  },
  {
    title: "Gafas de sol",
    href: "/category/gafas-de-sol",
    description:
      "Protección UV con estilo. Encuentra gafas de sol con y sin graduación.",
  },
];

const MenuList = () => (
  <NavigationMenu>
    {/* 🔸 AJUSTE: más espacio horizontal → space-x-4 */}
    <NavigationMenuList className="space-x-4">
      {/* Sobre nosotros */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none select-none focus:shadow-md"
                >
                  <div className="mt-4 mb-2 text-lg font-medium">TarreDev</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Más que gafas, una experiencia visual. Entra y deslúmbrate.
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            <ListItem href="/shop" title="Tienda">
              Accede a toda tu información, tus pedidos y mucho más.
            </ListItem>
            <ListItem href="/offers" title="Ofertas">
              Sección dedicada a promociones y descuentos especiales
            </ListItem>
            <ListItem href="/accesorios" title="Accesorios">
              Productos complementarios como gotas, limpiador de lentes, paños,
              estuches, etc.
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* Categorías */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {components.map(({ title, href, description }) => (
              <ListItem key={title} title={title} href={href}>
                {description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* Accesorios (enlace directo) */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/accesorios">Accesorios</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
export default MenuList;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
