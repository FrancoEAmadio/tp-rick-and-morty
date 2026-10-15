const API_URL = import.meta.env.VITE_API_URL

export function urlListado({ name, status, species, page }) {
  const parametros = new URLSearchParams()
  if (name) parametros.set('name', name)
  if (status) parametros.set('status', status)
  if (species) parametros.set('species', species)
  if (page > 1) parametros.set('page', page)
  return `${API_URL}/character/?${parametros}`
}

export function urlDetalle(id) {
  return `${API_URL}/character/${encodeURIComponent(id)}`
}

export function urlAvatar(id) {
  return `${API_URL}/character/avatar/${id}.jpeg`
}
