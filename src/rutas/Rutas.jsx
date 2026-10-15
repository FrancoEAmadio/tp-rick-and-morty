import { Routes, Route } from 'react-router'
import Layout from '../componentes/Layout'
import Inicio from '../paginas/Inicio'
import Personajes from '../paginas/Personajes'
import DetallePersonaje from '../paginas/DetallePersonaje'
import Favoritos from '../paginas/Favoritos'
import NoEncontrado from '../paginas/NoEncontrado'

export default function Rutas() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="personajes" element={<Personajes />} />
        <Route path="personajes/:id" element={<DetallePersonaje />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}
