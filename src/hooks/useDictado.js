import { useEffect, useRef, useState } from 'react'

const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition

export function useDictado(alTexto) {
  const [permiso, setPermiso] = useState('desconocido')
  const [escuchando, setEscuchando] = useState(false)
  const [error, setError] = useState(null)
  const reconocedor = useRef(null)
  const soportado = Boolean(Reconocimiento)

  useEffect(() => {
    if (!navigator.permissions?.query) return
    let estado
    navigator.permissions
      .query({ name: 'microphone' })
      .then((resultado) => {
        estado = resultado
        setPermiso(resultado.state)
        resultado.onchange = () => setPermiso(resultado.state)
      })
      .catch(() => {})
    return () => {
      if (estado) estado.onchange = null
    }
  }, [])

  useEffect(() => () => reconocedor.current?.abort(), [])

  function iniciar() {
    if (!soportado) return
    setError(null)

    const r = new Reconocimiento()
    r.lang = 'es-AR'
    r.interimResults = false
    r.onresult = (evento) => alTexto(evento.results[0][0].transcript)
    r.onerror = (evento) => {
      if (evento.error === 'not-allowed' || evento.error === 'service-not-allowed') {
        setPermiso('denied')
        setError('No diste permiso para usar el micrófono. Habilitalo desde el candado de la barra de direcciones y probá de nuevo.')
      } else if (evento.error === 'no-speech') {
        setError('No se escuchó nada. Probá de nuevo.')
      } else {
        setError('No se pudo usar el micrófono.')
      }
    }
    r.onend = () => setEscuchando(false)

    reconocedor.current = r
    r.start()
    setEscuchando(true)
  }

  function detener() {
    reconocedor.current?.stop()
  }

  return { soportado, permiso, escuchando, error, iniciar, detener }
}