import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return ( 
        <>
        <div className="mt-4 text-center">
            <p>Descubre una nueva forma de ver el mundo</p>
             <h4 className="mt-2 text-5xl font-extrabold upperce">Visión clara</h4>
             <p className="my-2 text-lg">Soluciones visuales pensadas para ti</p>
             <Link href="#" className={buttonVariants()}>Comprar</Link>
        </div>
        <div className="h-[350px] bg-cover lg:h-[600px] bg-[url('/slider-image.jpg')] bg-center mt-5"></div>
        </>
     );
}
 
export default BannerProduct;