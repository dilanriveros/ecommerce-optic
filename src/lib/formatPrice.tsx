export function formatPrice(price: number) {
  const priceFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
  const finalPrice = formatPrice
  return priceFormatted;
}
