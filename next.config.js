/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ya no es necesario configurar "images" si usas <img />
  // Así evitamos problemas y simplificamos

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  }
}

module.exports = nextConfig
