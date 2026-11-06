import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../api/supabase'

export default function Acceso() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('entrar')
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState(null)
  const [aviso, setAviso] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError(null)
    setAviso(null)
    setEnviando(true)

    const credenciales = { email, password: clave }
    const { data, error: errorAuth } =
      modo === 'entrar'
        ? await supabase.auth.signInWithPassword(credenciales)
        : await supabase.auth.signUp(credenciales)

    setEnviando(false)

    if (errorAuth) {
      setError(errorAuth.message)
      return
    }
    if (!data.session) {
      setAviso('Te enviamos un mail para confirmar la cuenta.')
      return
    }
    navigate('/personajes')
  }

    return (
    <main className="acceso">
      <h1 className="titulo-pagina">{modo === 'entrar' ? 'Ingresar' : 'Crear cuenta'}</h1>

      <form className="formulario" onSubmit={manejarEnvio}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} required minLength={6} />
        </label>

        {error && <p className="mensaje-error" role="alert">{error}</p>}
        {aviso && <p role="status">{aviso}</p>}

        <button type="submit" className="boton boton-principal boton-bloque" disabled={enviando}>
          {enviando ? 'Enviando...' : modo === 'entrar' ? 'Ingresar' : 'Registrarme'}
        </button>
      </form>

      <button
        type="button"
        className="boton boton-secundario"
        onClick={() => setModo(modo === 'entrar' ? 'registrar' : 'entrar')}
      >
        {modo === 'entrar' ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Ingresá'}
      </button>
    </main>
  )
}