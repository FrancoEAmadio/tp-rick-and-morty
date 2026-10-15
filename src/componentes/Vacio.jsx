export default function Vacio({ titulo, mensaje, children }) {
  return (
    <section role="status" className="estado-vacio">
      <h2>{titulo}</h2>
      <p>{mensaje}</p>
      {children}
    </section>
  )
}
