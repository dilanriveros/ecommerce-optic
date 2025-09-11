"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageSuccess = () => {
    const router = useRouter()
    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center">
                
                <div className="flex justify-center">
                    <Image 
                        src="/success.jpg" 
                        alt="Success" 
                        width={320}  
                        height={480} 
                        className="rounded-lg w-[240px] sm:w-[320px]"
                        priority
                    />
                </div>
                

                <div className="sm:flex-1">
                    <h1 className="text-3xl font-medium">¡Gracias por tu compra!</h1>
                    <p className="my-4 text-base sm:pr-4">
                        Gracias por confiar en nosotros. Hemos recibido tu compra y comenzamos 
                        a preparar tus productos. Te enviaremos los detalles del envío.
                    </p>
                    <Button 
                        onClick={() => router.push("/")}
                        size="lg"
                    >
                        Volver a la tienda
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default PageSuccess;