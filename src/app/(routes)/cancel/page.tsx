"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageCancel = () => {
    const router = useRouter()
    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <div className="flex justify-center md:min-w-[400px]">
                </div>
                <div>
                    <h1 className="text-3xl">¡Pago cancelado!</h1>
                    <p className="my-3">
                        El proceso de pago ha sido cancelado. No se ha realizado ningún cargo a tu cuenta.
                        Si fue un error, puedes intentar nuevamente completando tu compra.
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={() => router.push("/")}>Volver a la tienda</Button>
                        <Button variant="outline" onClick={() => router.back()}>Reintentar pago</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PageCancel;