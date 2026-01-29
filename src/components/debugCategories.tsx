// components/DebugCategories.tsx
"use client";

import { useEffect } from 'react';

export default function DebugCategories() {
  useEffect(() => {
    // Test directo de la API
    const testAPI = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log('🔧 BACKEND_URL:', BACKEND_URL);
      
      try {
        const response = await fetch(`${BACKEND_URL}/api/categories?populate=*`);
        const data = await response.json();
        
        console.log('📦 DATOS CRUDOS DE CATEGORÍAS:', data);
        
        if (data.data && data.data.length > 0) {
          const categoryWithImage = data.data.find((c: any) => c.mainImage);
          if (categoryWithImage) {
            console.log('🖼️ CATEGORÍA CON IMAGEN EJEMPLO:', {
              nombre: categoryWithImage.categoryName,
              mainImage: categoryWithImage.mainImage,
              url: categoryWithImage.mainImage.url,
              esCloudinary: categoryWithImage.mainImage.url?.includes('cloudinary'),
              urlThumbnail: categoryWithImage.mainImage.formats?.thumbnail?.url
            });
            
            // Test de carga de imagen
            const img = new Image();
            img.src = categoryWithImage.mainImage.url;
            img.onload = () => console.log('✅ IMAGEN CARGABLE desde Cloudinary');
            img.onerror = () => console.log('❌ IMAGEN NO CARGABLE desde Cloudinary');
          }
        }
      } catch (error) {
        console.error('❌ ERROR en fetch:', error);
      }
    };
    
    testAPI();
  }, []);
  
  return null;
}