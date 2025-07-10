"use client";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
  {
    id: 1,
    title: "Calidad Garantizada",
    description:
      "Trabajamos con las mejores marcas para ofrecerte lentes duraderos y confiables.",
    link: "#!",
  },
  {
    id: 2,
    title: "Compra Segura",
    description:
      "Protegemos tus datos y pagos con tecnología cifrada para tu tranquilidad.",
    link: "#!",
  },
  {
    id: 3,
    title: "Garantía Oficial",
    description: "Todos nuestros productos incluyen garantía del fabricante.",
    link: "#!",
  },
  {
    id: 4,
    title: "Envio Gratis",
    description:
      "Realiza una compra ahora y tendrás el envío gratis a todo el país.",
    link: "#!",
  },
];

const CarouselTextBanner = () => {
  const router = useRouter();

  return (
    /* padding horizontal para que el texto no se corte en mobile */
    <section className="bg-gray-200 dark:bg-primary w-full py-0 px-4">
      <Carousel
        className="w-full max-w-4xl mx-auto"
        plugins={[Autoplay({ delay: 2500 })]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link, description }) => (
            /* pequeño padding interno en cada slide */
            <CarouselItem
              key={id}
              onClick={() => router.push(link)}
              className="cursor-pointer px-2"
            >
              <Card className="shadow-none border-none bg-transparent">
                <CardContent className="flex flex-col items-center justify-center p-2 text-center">
                  <p className="sm:text-lg text-wrap dark:text-secondary">
                    {title}
                  </p>
                  <p className="text-xs sm:text-sm text-wrap dark:text-secondary">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CarouselTextBanner;
