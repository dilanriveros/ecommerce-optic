"use client"
import { useLovedProducts } from "../../../../hooks/use-loved-products";
import LovedItemProduct from "./components/loved-item-product";

export default function Page (){
    const {lovedItems} = useLovedProducts()
    return (
        <div className="max-w-4xl px-4 pt-6 pb-6 mx-auto sm:pt-32 sm:px-24">
            <h1 className="text-xl font-semibold text-center sm:text-2xl">Productos que te gustan
            </h1>
        <div>
                <div>
                    {lovedItems.length == 0 && (
                        <p className="text-sm text-gray-500 text-center px-4 mt-6 sm:text-base">No hay productos en la sección de me gusta</p>
                    )}
                    <ul>
                        {lovedItems.map((item) => (
                           <LovedItemProduct key={item.id} product={item} />
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    );
}