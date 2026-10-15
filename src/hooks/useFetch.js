import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [resultado, setResultado] = useState({ url: null, datos: null, error: null })

  useEffect(() => {
    const controlador = new AbortController()

    fetch(url, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          const fallo = new Error(`No se pudo obtener la información (código ${respuesta.status})`)
          fallo.status = respuesta.status
          throw fallo
        }
        return respuesta.json()
      })
      .then((datos) => setResultado({ url, datos, error: null }))
      .catch((fallo) => {
        if (fallo.name === 'AbortError') return
        const mensaje = fallo.status ? fallo.message : 'No se pudo conectar con el servidor'
        setResultado({ url, datos: null, error: { mensaje, status: fallo.status ?? null } })
      })

    return () => controlador.abort()
  }, [url])

  const cargando = resultado.url !== url

  return {
    datos: cargando ? null : resultado.datos,
    error: cargando ? null : resultado.error,
    cargando,
  }
}
