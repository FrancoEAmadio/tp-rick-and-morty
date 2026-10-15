export default function Filtros({ valores, alCambiar, alLimpiar }) {
  return (
    <div className="filtros-contenedor">
      <div className="filtros" role="search">
        <label className="campo campo-busqueda">
          <span className="solo-lectores">Buscar por nombre</span>
          <svg className="campo-icono" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            name="name"
            placeholder="Buscar por nombre..."
            value={valores.name}
            onChange={alCambiar}
            autoComplete="off"
          />
        </label>
        <label className="campo">
          <span className="solo-lectores">Filtrar por estado</span>
          <select name="status" value={valores.status} onChange={alCambiar}>
            <option value="">Estado: todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </label>
        <label className="campo">
          <span className="solo-lectores">Filtrar por especie</span>
          <select name="species" value={valores.species} onChange={alCambiar}>
            <option value="">Especie: todas</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoide</option>
            <option value="Robot">Robot</option>
            <option value="Animal">Animal</option>
          </select>
        </label>
        <button type="button" className="boton boton-secundario" onClick={alLimpiar}>
          Limpiar
        </button>
      </div>
    </div>
  )
}
