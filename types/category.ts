export type CategoryType = {
  id: number;
  categoryName: string;
  slug: string;
  mainImage: {
    data: {
      attributes: {
        url: string;  // ✅ La URL está aquí en Strapi v4
      };
    }[];
  };
};
