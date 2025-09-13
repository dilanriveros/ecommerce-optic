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

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;

  // Verificar que `images` sea un array y no esté vacío
  if (!Array.isArray(images)) {
    return <div>No images available</div>; // Si no es un array, muestra un mensaje o un fallback
  }

  return (
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                alt={image.alternativeText ?? "Image product"}
                className="rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;

