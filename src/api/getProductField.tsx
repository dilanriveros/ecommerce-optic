import { useEffect, useState } from "react";
import { ResultFilterTypes } from "../../types/filters";

export function useGetProductField() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-type-builder/content-types/api::product.product`;
  const [result, setResult] = useState<ResultFilterTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data); // Asegúrate de que la API devuelve { data: { schema: { style: { enum: [...] } } }
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
}