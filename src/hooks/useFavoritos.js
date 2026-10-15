import { useState } from 'react'

const CLAVE = 'favoritos_rym'

function leerGuardados() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE))
    return Array.isArray(guardados) ? guardados : []
  } catch {
    return []
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(leerGuardados)

  const esFavorito = (id) => favoritos.some((favorito) => favorito.id === id)

  const alternarFavorito = (personaje) => {
    const actuales = leerGuardados()
    const existe = actuales.some((favorito) => favorito.id === personaje.id)
    const { id, name, image, status, species } = personaje
    const nuevos = existe
      ? actuales.filter((favorito) => favorito.id !== personaje.id)
      : [...actuales, { id, name, image, status, species }]

    localStorage.setItem(CLAVE, JSON.stringify(nuevos))
    setFavoritos(nuevos)
  }

  return { favoritos, esFavorito, alternarFavorito }
}
