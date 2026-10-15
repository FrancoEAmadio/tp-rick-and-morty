# Rick and Morty Explorer

Trabajo práctico del Parcial 1 de Clientes Web Mobile (ISEC, Tecnicatura Superior en Diseño y Programación Web). Está hecho con React y consume la API pública de Rick and Morty. Se pueden buscar personajes, filtrarlos por estado y especie, ver el detalle de cada uno y guardar favoritos.

Hice la opción A, así que el trabajo es individual.

## Pantallas

- `/` portada con acceso al listado
- `/personajes` listado con búsqueda, filtros y paginado
- `/personajes/:id` detalle del personaje
- `/favoritos` personajes guardados
- cualquier otra ruta muestra la pantalla de "no encontrado"

## Cómo instalarlo y correrlo

Hace falta tener Node instalado.

```bash
npm install
cp .env.ejemplo .env
npm run dev
```

En Windows, en vez de `cp` se usa `copy .env.ejemplo .env`.

Para probarlo en el celular (misma wifi que la compu):

```bash
npm run dev -- --host
```

Vite muestra una dirección de red que se abre desde el teléfono.

## Variables de entorno

Se definen en un archivo `.env` en la raíz (el repo trae un `.env.ejemplo` con los valores de muestra):

| Variable | Para qué sirve |
| --- | --- |
| `VITE_API_URL` | Dirección base de la API |
| `VITE_TITULO` | Título que se muestra en la app y en la pestaña |

## Versiones

React 19.3.0, React Router 7.18.4 (se importa de `react-router`), Vite 6.4.3 y @vitejs/plugin-react 5.2.0. No se usaron librerías de pedidos ni de estilos, el CSS es puro y los pedidos se hacen con `fetch`.

## Estructura

```
src/
  api/          armado de las URLs y traducciones de los datos
  componentes/  piezas reutilizables (Tarjeta, Filtros, Paginado, etc.)
  hooks/        useFetch y useFavoritos
  paginas/      una por cada pantalla
  rutas/        definición de las rutas
```

## Decisiones

**1. Un solo hook para los pedidos.** El listado y el detalle usan el mismo `useFetch`, así que la lógica del `fetch` está escrita una sola vez. Ahí se chequea `response.ok` antes del `.json()` y se cancela el pedido anterior con `AbortController` cuando cambia la URL, para que si tipeás rápido en el buscador una respuesta vieja no pise a la nueva. Cuando la API devuelve 404 el hook lo informa con el código, y cada pantalla decide qué hacer: en el listado es "sin resultados" y en el detalle es "no encontrado".

**2. Los filtros viven en la URL.** Usé `useSearchParams` para el nombre, el estado, la especie y la página, y no `useState`. Así se puede copiar el enlace, abrirlo en otra pestaña y ver lo mismo, y el botón de volver del navegador funciona como se espera. Al escribir en el buscador uso `replace` para no llenar el historial con una entrada por cada letra, y al cambiar un filtro vuelvo a la página 1.

**3. Los cuatro estados en un componente.** Cargando, error, vacío y datos los resuelve `EstadoDatos`, y no repetí esos mensajes en cada página. Separé el vacío del error a propósito: una búsqueda sin resultados no es una falla y se avisa distinto.

Además, los favoritos se guardan en `localStorage` con un hook propio (`useFavoritos`) y solo con los datos que necesita la tarjeta (id, nombre, imagen, estado y especie), así no se guarda el personaje completo.

**Uso de IA**. El proyecto lo genere con una IA a partir de los requisitos del parcial: los componentes, los hooks (`useFetch` y `useFavoritos`), las rutas y el CSS. Los commits también se armaron con su ayuda ya que es la primera vez que uso git.

## Autor

Franco Ezequiel Amadio
