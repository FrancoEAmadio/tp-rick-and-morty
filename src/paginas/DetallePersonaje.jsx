import { useLocation, useNavigate, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { useFavoritos } from '../hooks/useFavoritos'
import { urlDetalle } from '../api/personajes'
import { traducirEstado, traducirEspecie, traducirGenero } from '../api/traducciones'
import BotonFavorito from '../componentes/BotonFavorito'
import EstadoDatos from '../componentes/EstadoDatos'
import NoEncontrado from './NoEncontrado'

export default function DetallePersonaje() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { key } = useLocation()
  const { esFavorito, alternarFavorito } = useFavoritos()
  const { datos, cargando, error } = useFetch(urlDetalle(id))

  const volver = () => navigate(key === 'default' ? '/personajes' : -1)

  if (error?.status === 404) return <NoEncontrado />

  return (
    <main className="detalle">
      <button type="button" className="boton boton-secundario" onClick={volver}>
        ← Volver
      </button>

      <EstadoDatos cargando={cargando} error={error}>
        {datos && (
          <article className="detalle-contenido">
            <img src={datos.image} alt={datos.name} width="300" height="300" />
            <div className="detalle-datos">
              <div>
                <p className="etiqueta-pagina">Personaje #{datos.id}</p>
                <h1 className="titulo-pagina">{datos.name}</h1>
              </div>
              <dl className="datos-lista">
                <div>
                  <dt>Estado</dt>
                  <dd>
                    <span className={`punto-estado punto-${datos.status.toLowerCase()}`} aria-hidden="true" />
                    {traducirEstado(datos.status)}
                  </dd>
                </div>
                <div>
                  <dt>Especie</dt>
                  <dd>{traducirEspecie(datos.species)}</dd>
                </div>
                <div>
                  <dt>Género</dt>
                  <dd>{traducirGenero(datos.gender)}</dd>
                </div>
                {datos.type && (
                  <div>
                    <dt>Tipo</dt>
                    <dd>{datos.type}</dd>
                  </div>
                )}
                <div className="dato-ancho">
                  <dt>Origen</dt>
                  <dd>{datos.origin.name}</dd>
                </div>
                <div className="dato-ancho">
                  <dt>Ubicación</dt>
                  <dd>{datos.location.name}</dd>
                </div>
              </dl>
              <BotonFavorito
                personaje={datos}
                activo={esFavorito(datos.id)}
                alAlternar={alternarFavorito}
                conTexto
              />
            </div>
          </article>
        )}
      </EstadoDatos>
    </main>
  )
}
