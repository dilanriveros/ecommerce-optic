import { useEffect, useState } from 'react'
import { ResultFilterTypes } from '../../types/filters'

export function useGetProductBySlug(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
    const [result, setResult] = useState <ResultFilterTypes | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json.data)
                setLoading(false)
            } catch (error: any) {
                setError(error.message) // Asegúrate de acceder a message
                setLoading(false)
            }
        })()
    }, [url])

    return { loading, result, error }
}