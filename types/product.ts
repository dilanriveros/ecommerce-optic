export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  style: string;
  price: number;

  /** Strapi lo duplica; úsalo si quieres */
  categoryName: string;

  /** Ya NO hay “data” */
  category: {
    id: number;
    categoryName: string;
    slug: string;
  };

  /** Aquí sí es un array, sin “attributes” */
  images: {
    id: number;
    url: string;          // o “name”, “formats”… según tu modelo
    alternativeText: string | null;
    caption: string | null;
  }[];
};
