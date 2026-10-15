export default function Paginado({ pagina, totalPaginas, alCambiar }) {
  return (
    <nav className="paginado" aria-label="Paginado">
      <button
        type="button"
        className="boton boton-secundario"
        disabled={pagina <= 1}
        onClick={() => alCambiar(pagina - 1)}
      >
        Anterior
      </button>
      <p>
        Página {pagina} de {totalPaginas}
      </p>
      <button
        type="button"
        className="boton boton-secundario"
        disabled={pagina >= totalPaginas}
        onClick={() => alCambiar(pagina + 1)}
      >
        Siguiente
      </button>
    </nav>
  )
}
