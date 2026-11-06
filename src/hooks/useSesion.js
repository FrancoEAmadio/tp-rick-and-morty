import { useEffect, useState } from 'react'
import { supabase } from '../api/supabase'

export function useSesion() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUsuario(data.session?.user ?? null)
      setCargando(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      setUsuario(sesion?.user ?? null)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return { usuario, cargando }
}