// lib/image-utils.ts
export const getStrapiMedia = (media: any): string => {
  // Si no hay media, devuelve placeholder
  if (!media) return '/placeholder.jpg';
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  
  // CASO 1: Si es un objeto con propiedad 'url' (estructura Strapi)
  if (media && typeof media === 'object' && media.url) {
    const url = media.url;
    
    // URL absoluta (Cloudinary)
    if (url.startsWith('http')) return url;
    
    // URL Cloudinary sin protocolo
    if (url.startsWith('//')) return `https:${url}`;
    
    // URL relativa (uploads)
    if (BACKEND_URL) {
      return `${BACKEND_URL}${url.startsWith('/') ? url : `/${url}`}`;
    }
    
    return url;
  }
  
  // CASO 2: Si es string (URL directa)
  if (typeof media === 'string') {
    const url = media;
    
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    
    if (BACKEND_URL) {
      return `${BACKEND_URL}${url.startsWith('/') ? url : `/${url}`}`;
    }
    
    return url;
  }
  
  // CASO 3: Si tiene formats (priorizar thumbnail o medium)
  if (media.formats) {
    // Intentar obtener thumbnail, small, medium, large (en ese orden)
    const format = media.formats.thumbnail || 
                   media.formats.small || 
                   media.formats.medium || 
                   media.formats.large || 
                   media;
    
    // Llamada recursiva
    return getStrapiMedia(format);
  }
  
  return '/placeholder.jpg';
};

// Helper adicional para debug
export const debugMedia = (media: any): void => {
  console.log('DEBUG MEDIA:', {
    raw: media,
    type: typeof media,
    hasUrl: media?.url ? 'SI' : 'NO',
    urlType: typeof media?.url,
    urlValue: media?.url,
    formats: media?.formats ? Object.keys(media.formats) : 'NO'
  });
};