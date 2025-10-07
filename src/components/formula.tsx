import Link from "next/link";

const ContactarFormula = ({ category }: { category: any }) => {
  const phoneNumber = "+573107714001"; 
  const defaultMessage =
      "Hola, estoy interesado en productos con fórmula. ¿Me pueden dar más información?";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  
  const normalized = String(category?.slug ?? category?.name ?? "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  
  if (!["lentes-de-contacto", "monturas"].includes(normalized)) {
    <Link
      href={whatsappLink}
      target="_blank"
      className="inline-block text-center font-semibold px-8 py-3 rounded-full 
                 bg-gradient-to-r from-green-500 to-emerald-600 
                 text-white shadow-lg transform transition 
                 hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-emerald-700 
                 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      📩 ¿Deseas con fórmula? Escríbenos aquí
    </Link>
    
  }

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      className="inline-block text-center font-semibold px-8 py-3 rounded-full 
                 bg-gradient-to-r from-green-500 to-emerald-600 
                 text-white shadow-lg transform transition 
                 hover:scale-105 hover:shadow-xl hover:from-green-600 hover:to-emerald-700 
                 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      📩 ¿Deseas con fórmula? Escríbenos aquí
    </Link>
  );
};

export default ContactarFormula;
