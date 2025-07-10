import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger className="h-14 flex items-center justify-center">
        <Menu className="h-6 w-6" />
      </PopoverTrigger>
      <PopoverContent>
        <Link href="/category/gafas" className="block">Gafas</Link>
        <Link href="/category/monturas" className="block">Monturas</Link>
        <Link href="/category/lentes-de-contacto" className="block">Lentes de contacto</Link>
      </PopoverContent>
    </Popover>
  );
};

export default ItemsMenuMobile;
