import {useEffect, useState } from "react"

export function useGetCategories () {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`
    const [result, setResult] = useState<any[]>([]) // ← ARRAY VACÍO, NO NULL
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
    useEffect (() => {
        (async () => {
            try {
               const res = await fetch(url) 
               const json = await res.json()
               
               console.log("📦 API Response:", json) // DEBUG
               
               // Asegurar que siempre sea un array
               const data = json.data || []
               setResult(data)
               setLoading(false)
               
            } catch (error: any) {
                console.error("❌ Fetch error:", error)
                setError(error.message || "Error desconocido")
                setResult([]) // ← Asegurar array vacío
                setLoading(false)
            }
        })()
    }, [url])
    
    return {loading, result, error}
}