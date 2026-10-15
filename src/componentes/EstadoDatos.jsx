import Cargando from './Cargando'
import MensajeError from './MensajeError'

export default function EstadoDatos({ cargando, error, vacio, children }) {
  if (cargando) return <Cargando />
  if (error) return <MensajeError mensaje={error.mensaje} />
  if (vacio) return vacio
  return children
}
