import { useEffect, useState } from "react"

export function useGetCategories() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`
    const [result, setResult] = useState<any[]>([]) // ← INICIALIZA COMO ARRAY VACÍO
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url) 
                const json = await res.json()
                // Asegúrate de que json.data sea un array
                setResult(Array.isArray(json.data) ? json.data : [])
                setLoading(false)
            } catch (error: any) {
                setError(error.message || "Error desconocido")
                setLoading(false)
            }
        })()
    }, [url])
    
    return { loading, result, error }
}