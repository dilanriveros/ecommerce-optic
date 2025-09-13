// types/product.ts
export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  style: string;
  price: number;

  categoryName: string;

  category: {
    id: number;
    categoryName: string;
    slug: string;
  };

  images: {
    id: number;
    url: string;          
    alternativeText: string | null;
    caption: string | null;
  }[];
};
