import { Link } from 'react-router'
import BotonFavorito from './BotonFavorito'
import { traducirEstado, traducirEspecie } from '../api/traducciones'

export default function Tarjeta({ personaje, esFavorito, alAlternarFavorito }) {
  return (
    <article className="tarjeta-personaje">
      <div className="tarjeta-imagen">
        <img src={personaje.image} alt={personaje.name} width="300" height="300" loading="lazy" />
        <BotonFavorito personaje={personaje} activo={esFavorito} alAlternar={alAlternarFavorito} />
      </div>
      <div className="contenido-tarjeta">
        <h3 className="titulo-verde">{personaje.name}</h3>
        <p className="meta-tarjeta">
          <span className={`punto-estado punto-${personaje.status.toLowerCase()}`} aria-hidden="true" />
          {traducirEstado(personaje.status)} · {traducirEspecie(personaje.species)}
        </p>
        <Link className="boton boton-secundario boton-bloque" to={`/personajes/${personaje.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  )
}
