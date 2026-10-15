import { Link } from 'react-router'
import { urlAvatar } from '../api/personajes'

const IDS_MOSAICO = [1, 2, 3, 4, 5, 47, 242, 244, 361, 19, 8, 21]
const TITULO = import.meta.env.VITE_TITULO

export default function Inicio() {
  return (
    <main className="hero">
      <div className="hero-mosaico" aria-hidden="true">
        {IDS_MOSAICO.map((id) => (
          <img key={id} src={urlAvatar(id)} alt="" width="300" height="300" />
        ))}
      </div>
      <div className="hero-contenido">
        <p className="hero-etiqueta">Explorador de personajes</p>
        <h1>{TITULO}</h1>
        <p className="hero-texto">
          Buscá personajes por nombre, filtralos por estado y especie, y guardá tus favoritos.
        </p>
        <Link to="/personajes" className="boton boton-principal">Explorar personajes</Link>
      </div>
    </main>
  )
}
