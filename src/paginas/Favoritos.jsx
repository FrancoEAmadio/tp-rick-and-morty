import { Link } from 'react-router'
import { useFavoritos } from '../hooks/useFavoritos'
import Tarjeta from '../componentes/Tarjeta'
import Vacio from '../componentes/Vacio'

export default function Favoritos() {
  const { favoritos, esFavorito, alternarFavorito } = useFavoritos()

  return (
    <main>
      <div className="cabecera-pagina">
        <p className="etiqueta-pagina">Tu colección</p>
        <h1 className="titulo-pagina">Mis favoritos</h1>
        {favoritos.length > 0 && (
          <p className="subtitulo-pagina">
            {favoritos.length} {favoritos.length === 1 ? 'personaje guardado' : 'personajes guardados'}
          </p>
        )}
      </div>

      {favoritos.length === 0 ? (
        <Vacio
          titulo="Todavía no hay favoritos"
          mensaje="Tocá el corazón en cualquier personaje para guardarlo acá."
        >
          <Link to="/personajes" className="boton boton-principal">Explorar personajes</Link>
        </Vacio>
      ) : (
        <div className="grilla">
          {favoritos.map((personaje) => (
            <Tarjeta
              key={personaje.id}
              personaje={personaje}
              esFavorito={esFavorito(personaje.id)}
              alAlternarFavorito={alternarFavorito}
            />
          ))}
        </div>
      )}
    </main>
  )
}
