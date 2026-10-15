import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

const TITULO = import.meta.env.VITE_TITULO

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <header className="header-principal">
        <Link to="/" className="header-logo">{TITULO}</Link>
        <nav className="nav-principal" aria-label="Principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/personajes">Personajes</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
        </nav>
      </header>

      <Outlet />

      <footer className="footer-principal">
        <p className="footer-autor">Franco Ezequiel Amadio</p>
        <p className="footer-detalle">
          Datos de <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">The Rick and Morty API</a>
        </p>
      </footer>
    </>
  )
}
