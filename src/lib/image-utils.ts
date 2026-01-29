// lib/image-utils-simple.ts
export const getCategoryImageUrl = (mainImage: any, preferThumbnail: boolean = true): string => {
  if (!mainImage) return '/placeholder-category.jpg';
  
  // Si mainImage es un string (error)
  if (typeof mainImage === 'string') {
    console.error('⚠️ mainImage es string en lugar de objeto:', mainImage);
    return '/placeholder-category.jpg';
  }
  
  // Si es objeto con URL de Cloudinary
  if (mainImage.url && mainImage.url.startsWith('http')) {
    // Preferir thumbnail para mejor performance
    if (preferThumbnail && mainImage.formats?.thumbnail?.url) {
      return mainImage.formats.thumbnail.url;
    }
    return mainImage.url;
  }
  
  return '/placeholder-category.jpg';
};