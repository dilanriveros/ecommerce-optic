import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { ProductType } from "../types/product";

interface UseLovedProductsType {
    lovedItems: ProductType [],
    addLovedItem: (data: ProductType) => void
    removeLovedItem: (data: number) => void
}
export const useLovedProducts = create (persist <UseLovedProductsType>((set, get) =>({
    lovedItems: [],
    addLovedItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItems = currentLovedItems.find((item) => item.id == data.id)
        if (existingItems) {
            return toast({
                title: "El producto ya existe en la lista 🚫",
                variant: "destructive"
            })
        }
        set({
            lovedItems: [...get().lovedItems, data]
        })
        toast({
             title: "Producto añadido a la lista ❤️"
             })
    },
    removeLovedItem: (id: number) => {
        set ({lovedItems: [...get().lovedItems.filter((item) => item.id != id )]})
        toast({
            title: "El producto se ha eliminado de la lista 💔"
        })
    }
}),{
    name: "loved-products-storage",
    storage: createJSONStorage(() => localStorage)
}))