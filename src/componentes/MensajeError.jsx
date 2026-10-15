export default function MensajeError({ mensaje }) {
  return (
    <div role="alert" className="estado-error">
      <strong>Algo salió mal</strong>
      <p>{mensaje}</p>
    </div>
  )
}
