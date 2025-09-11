const Page = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Sobre Nosotros
      </h1>

      <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl p-8 shadow-md space-y-6">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
          Somos una óptica comprometida con tu bienestar visual y estilo personal.
          Combinamos tecnología, experiencia y pasión para ayudarte a encontrar las gafas ideales
          que se ajusten a tus necesidades, personalidad y presupuesto.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
          Creemos que una buena visión es clave para una vida plena. Por eso trabajamos día a día
          para ofrecer productos de calidad, atención cercana y asesoría especializada.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
          En <strong>Mirada Brillante Óptica</strong>, cada cliente es único. Nos apasiona brindar soluciones visuales con
          empatía, profesionalismo y estilo, para que cada visita a nuestra tienda sea una experiencia excepcional.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
          ¡Gracias por confiar en nosotros para cuidar tu visión y realzar tu mirada!
        </p>
      </div>
    </div>
  );
};

export default Page;
