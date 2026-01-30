/* eslint-disable @next/next/no-img-element */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface CarouselProductProps {
  images: {
    id: number;
    url: string;
    alternativeText: string | null;
    caption: string | null;
  }[];
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No hay imágenes disponibles
      </div>
    );
  }

  return (
    <div className="relative max-w-xl mx-auto sm:px-10">
      <Carousel>
        <CarouselContent>
          {images.map((image) => {
            // 🔥 EXACTAMENTE IGUAL QUE FEATUREDPRODUCTS 🔥
            const imageUrl = image?.url ?? null;
            
            return (
              <CarouselItem key={image.id}>
                <div className="flex items-center justify-center h-[320px] sm:h-[420px]">
                  {/* SOLUCIÓN: Añadir lógica para URLs relativas */}
                  <img
                    src={
                      imageUrl 
                        ? (imageUrl.startsWith('/') 
                            ? `https://backend-ecommerce-optica.onrender.com${imageUrl}`
                            : imageUrl)
                        : '/placeholder.jpg'
                    }
                    alt={image.alternativeText ?? "Imagen del producto"}
                    className="max-h-full object-contain rounded-lg"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-2 bg-black/60 text-white hover:bg-black" />
        <CarouselNext className="right-2 bg-black/60 text-white hover:bg-black" />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;