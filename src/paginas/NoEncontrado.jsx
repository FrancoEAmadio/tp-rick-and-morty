import { Link } from 'react-router'

export default function NoEncontrado() {
  return (
    <main className="pagina-404">
      <p className="codigo-404" aria-hidden="true">404</p>
      <h1>Esta dimensión no existe</h1>
      <p>La dirección que buscás no está en ninguna de las realidades que conocemos.</p>
      <Link to="/" className="boton boton-principal">Volver al inicio</Link>
    </main>
  )
}
