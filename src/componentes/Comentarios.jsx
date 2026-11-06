import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../api/supabase'
import { useSesion } from '../hooks/useSesion'

export default function Comentarios({ personajeId }) {
  const { usuario } = useSesion()
  const [comentarios, setComentarios] = useState([])
  const [texto, setTexto] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!usuario) return
    let activo = true

    supabase
      .from('comentarios')
      .select('*')
      .eq('personaje_id', personajeId)
      .order('creado_en', { ascending: false })
      .then(({ data, error: errorLectura }) => {
        if (!activo) return
        if (errorLectura) setError(errorLectura.message)
        else setComentarios(data)
      })

    const canal = supabase
      .channel(`comentarios-${personajeId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comentarios', filter: `personaje_id=eq.${personajeId}` },
        (payload) =>
          setComentarios((previos) =>
            previos.some((c) => c.id === payload.new.id) ? previos : [payload.new, ...previos]
          )
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'comentarios' },
        (payload) => setComentarios((previos) => previos.filter((c) => c.id !== payload.old.id))
      )
      .subscribe()

    return () => {
      activo = false
      supabase.removeChannel(canal)
    }
  }, [personajeId, usuario?.id])

  async function enviar(evento) {
    evento.preventDefault()
    const limpio = texto.trim()
    if (!limpio) return
    setError(null)

    const { data, error: errorInsert } = await supabase
      .from('comentarios')
      .insert({
        personaje_id: Number(personajeId),
        autor: usuario.email.split('@')[0],
        texto: limpio,
      })
      .select()
      .single()

    if (errorInsert) {
      setError(errorInsert.message)
      return
    }
    setComentarios((previos) => (previos.some((c) => c.id === data.id) ? previos : [data, ...previos]))
    setTexto('')
  }

  async function borrar(id) {
    setError(null)
    const { error: errorBorrar } = await supabase.from('comentarios').delete().eq('id', id)
    if (errorBorrar) {
      setError(errorBorrar.message)
      return
    }
    setComentarios((previos) => previos.filter((c) => c.id !== id))
  }

    return (
    <section className="comentarios" aria-labelledby="titulo-comentarios">
      <h2 id="titulo-comentarios">Comentarios</h2>

      {!usuario ? (
        <p>
          <Link to="/acceso">Ingresá</Link> para ver y escribir comentarios.
        </p>
      ) : (
        <>
          <form className="formulario" onSubmit={enviar}>
            <label>
              Tu comentario
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                maxLength={280}
                required
              />
            </label>
            <button type="submit" className="boton boton-principal">Comentar</button>
          </form>

          {error && <p className="mensaje-error" role="alert">{error}</p>}

          {comentarios.length === 0 ? (
            <p>Todavía no hay comentarios.</p>
          ) : (
            <ul className="lista-comentarios">
              {comentarios.map((c) => (
                <li key={c.id}>
                  <strong>{c.autor}</strong>
                  <small>{new Date(c.creado_en).toLocaleString('es-AR')}</small>
                  <p>{c.texto}</p>
                  {c.user_id === usuario.id && (
                    <button type="button" className="boton boton-secundario" onClick={() => borrar(c.id)}>
                      Borrar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}