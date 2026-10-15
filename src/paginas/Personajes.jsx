import { useSearchParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { useFavoritos } from '../hooks/useFavoritos'
import { urlListado } from '../api/personajes'
import EstadoDatos from '../componentes/EstadoDatos'
import Filtros from '../componentes/Filtros'
import Paginado from '../componentes/Paginado'
import Tarjeta from '../componentes/Tarjeta'
import Vacio from '../componentes/Vacio'

export default function Personajes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { esFavorito, alternarFavorito } = useFavoritos()

  const filtros = {
    name: searchParams.get('name') ?? '',
    status: searchParams.get('status') ?? '',
    species: searchParams.get('species') ?? '',
  }
  const pagina = Math.max(1, Number(searchParams.get('page')) || 1)

  const { datos, cargando, error } = useFetch(urlListado({ ...filtros, page: pagina }))
  const sinResultados = error?.status === 404

  const cambiarFiltro = (evento) => {
    const { name, value } = evento.target
    const nuevos = new URLSearchParams(searchParams)
    if (value) nuevos.set(name, value)
    else nuevos.delete(name)
    nuevos.delete('page')
    setSearchParams(nuevos, { replace: name === 'name' })
  }

  const limpiarFiltros = () => setSearchParams({})

  const irAPagina = (numero) => {
    const nuevos = new URLSearchParams(searchParams)
    nuevos.set('page', numero)
    setSearchParams(nuevos)
    window.scrollTo(0, 0)
  }

  return (
    <main>
      <div className="cabecera-pagina">
        <p className="etiqueta-pagina">Directorio</p>
        <h1 className="titulo-pagina">Personajes</h1>
        <p className="subtitulo-pagina">
          Buscá por nombre y filtrá por estado o especie. Todo queda guardado en la dirección.
        </p>
      </div>

      <Filtros valores={filtros} alCambiar={cambiarFiltro} alLimpiar={limpiarFiltros} />

      <EstadoDatos
        cargando={cargando}
        error={sinResultados ? null : error}
        vacio={
          sinResultados && (
            <Vacio
              titulo="Sin resultados"
              mensaje="No encontramos personajes que coincidan con la búsqueda. Probá con otro nombre o limpiá los filtros."
            >
              <button type="button" className="boton boton-secundario" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </Vacio>
          )
        }
      >
        {datos && (
          <>
            <p className="resultados">{datos.info.count} personajes encontrados</p>
            <div className="grilla">
              {datos.results.map((personaje) => (
                <Tarjeta
                  key={personaje.id}
                  personaje={personaje}
                  esFavorito={esFavorito(personaje.id)}
                  alAlternarFavorito={alternarFavorito}
                />
              ))}
            </div>
            <Paginado pagina={pagina} totalPaginas={datos.info.pages} alCambiar={irAPagina} />
          </>
        )}
      </EstadoDatos>
    </main>
  )
}
