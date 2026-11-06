# Rick and Morty Explorer

Trabajo práctico de Clientes Web Mobile (ISEC, Tecnicatura Superior en Diseño y Programación Web). Hecho con React y la API pública de Rick and Morty: se pueden buscar personajes, filtrarlos por estado y especie, ver el detalle de cada uno y guardar favoritos.

- **Parcial 1:** el explorador de personajes (listado, filtros, detalle y favoritos).
- **Parcial 2:** cuentas de usuario, comentarios guardados en la nube con reglas de seguridad, cambios en vivo y dictado por voz.

Trabajo individual.

## Parcial 2: qué elegí

| Punto | Elección |
| --- | --- |
| Servicio | **Supabase** |
| Opción | **A, en vivo** (lo que comenta o borra otra cuenta aparece o desaparece sin recargar) |
| API del teléfono | **Voz** (reconocimiento de voz del navegador) para dictar comentarios |
| Entidad guardada en la nube | **Comentarios** de cada personaje (tabla `comentarios`) |

| Requisito | Dónde está |
| --- | --- |
| 1. Cuentas | `src/paginas/Acceso.jsx` (ingresar y registrarse), `src/hooks/useSesion.js` y botón Salir en `src/componentes/Layout.jsx`. La sesión sigue abierta al recargar |
| 2. Datos con reglas | `src/componentes/Comentarios.jsx` (crear, listar y borrar) y `supabase.sql` (tabla y políticas) |
| 3. API del teléfono | `src/hooks/useDictado.js` y el botón de dictado en `Comentarios.jsx` |
| 4. Opción A | Suscripción en vivo con limpieza dentro de `Comentarios.jsx` |

## Cómo armarlo desde cero

Hace falta tener Node instalado y una cuenta en [supabase.com](https://supabase.com).

1. Clonar el repo e instalar las dependencias:

   ```bash
   npm install
   ```

2. Crear un proyecto nuevo en Supabase (plan gratuito).
3. En el proyecto, ir a **SQL Editor**, pegar el contenido de `supabase.sql` y ejecutarlo. Crea la tabla `comentarios`, activa RLS, crea las tres políticas y habilita los cambios en vivo.
4. En **Authentication**, **Sign In / Providers**, dejar encendido el proveedor **Email** y apagar **Confirm email**, para que las cuentas nuevas entren sin confirmar el correo.
5. Crear el archivo `.env` a partir del ejemplo y completarlo:

   ```bash
   cp .env.ejemplo .env
   ```

   En Windows, en vez de `cp` se usa `copy .env.ejemplo .env`.

   Los valores de Supabase están en **Project Settings**, **API Keys**: la URL del proyecto y la clave pública (*publishable*, o *anon* en las versiones anteriores del panel). **No usar nunca la clave `secret` ni la `service_role`.**

6. Crear los dos usuarios de prueba en **Authentication**, **Users**, **Add user**, tildando **Auto Confirm User** (o registrarlos desde `/acceso`).
7. Levantar el proyecto:

   ```bash
   npm run dev
   ```

Para probarlo en el celular (misma wifi que la compu): `npm run dev -- --host`. Vite muestra una dirección de red que se abre desde el teléfono.

## Usuarios de prueba

| Email | Contraseña |
| --- | --- |
| `prueba1@test.com` | `Prueba1234` |
| `prueba2@test.com` | `Prueba1234` |

Hay que crearlos en el proyecto de Supabase propio (paso 6).

## Cómo probar

1. **Sesión:** entrar a `/acceso` con `prueba1`. El menú muestra el mail y Salir. Recargar con F5: la sesión sigue abierta.
2. **Comentarios:** abrir un personaje, escribir un comentario y tocar Comentar. Aparece en la lista; con F5 sigue ahí.
3. **En vivo:** abrir una ventana de incógnito, entrar con `prueba2` y abrir el mismo personaje. Lo que comenta o borra una cuenta aparece o desaparece en la otra sin recargar.
4. **Reglas:** cada cuenta ve el botón Borrar solo en sus comentarios, y la base rechaza borrar los de otra aunque se fuerce desde afuera.
5. **Voz:** tocar Dictar con el micrófono y hablar en español. El texto se escribe en el cuadro.

## Reglas de seguridad

El archivo `supabase.sql` tiene RLS activo en la tabla `comentarios` y estas políticas:

| Acción | Quién puede | Regla |
| --- | --- | --- |
| Listar | Cualquier usuario con sesión | `to authenticated using (true)`. Sin sesión no se lee nada |
| Crear | Cada usuario, a su nombre | `with check (user_id = auth.uid())`. El `user_id` se completa solo con el usuario logueado |
| Borrar | Cada usuario, solo lo suyo | `using (user_id = auth.uid())` |
| Modificar | Nadie | No hay política de update, así que la base rechaza cualquier modificación |

Que cada usuario modifique y borre solo lo suyo lo garantizan estas reglas y no la interfaz: ocultar el botón Borrar es solo una comodidad.

En el repositorio solo está la clave pública. No hay claves secretas ni `service_role`, y el `.env` real está en el `.gitignore`.

## API del teléfono: voz

El botón **Dictar con el micrófono** usa el reconocimiento de voz del navegador (`SpeechRecognition`, con idioma `es-AR`) para escribir lo que se dice en el cuadro del comentario. Sirve para comentar sin tipear, que en el celular es lo más cómodo.

Estados del permiso, que se muestran en pantalla (`Micrófono: ...`):

- **permitido:** dictado habilitado.
- **se pedirá al dictar:** el navegador todavía no preguntó; lo hace al tocar el botón.
- **bloqueado:** se muestra un mensaje que explica cómo habilitarlo desde el candado de la barra de direcciones.
- **sin consultar:** el navegador no informa el estado del permiso.

Si el navegador no soporta voz (por ejemplo Firefox) se avisa con un mensaje y el resto de la app sigue funcionando. Funciona en Chrome y Edge, necesita internet y solo anda en `localhost` o con HTTPS.

## Variables de entorno

Se definen en un archivo `.env` en la raíz. El repo trae un `.env.ejemplo` con los nombres y sin valores.

| Variable | Para qué sirve |
| --- | --- |
| `VITE_API_URL` | Dirección base de la API de Rick and Morty |
| `VITE_TITULO` | Título que se muestra en la app y en la pestaña |
| `VITE_SUPABASE_URL` | URL del proyecto de Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave pública (publishable) de Supabase |

## Versiones

React 19.3.0, React Router 7.18.4 (se importa de `react-router`), Vite 6.4.3, @vitejs/plugin-react 5.2.0 y @supabase/supabase-js 2.119. El CSS es puro y los pedidos a la API de Rick and Morty se hacen con `fetch`.

## Pantallas

- `/` portada con acceso al listado
- `/personajes` listado con búsqueda, filtros y paginado
- `/personajes/:id` detalle del personaje, con sus comentarios
- `/favoritos` personajes guardados
- `/acceso` ingresar o crear cuenta
- cualquier otra ruta muestra la pantalla de "no encontrado"

## Estructura

```
src/
  api/          URLs de la API, traducciones y cliente de Supabase
  componentes/  piezas reutilizables (Tarjeta, Filtros, Comentarios, etc.)
  hooks/        useFetch, useFavoritos, useSesion y useDictado
  paginas/      una por cada pantalla
  rutas/        definición de las rutas
supabase.sql    tabla, RLS y políticas
```

## Decisiones

**1. Un solo hook para los pedidos.** El listado y el detalle usan el mismo `useFetch`, así que la lógica del `fetch` está escrita una sola vez. Ahí se chequea `response.ok` antes del `.json()` y se cancela el pedido anterior con `AbortController` cuando cambia la URL, para que una respuesta vieja no pise a la nueva. Cuando la API devuelve 404 el hook lo informa con el código y cada pantalla decide qué hacer.

**2. Los filtros viven en la URL.** Con `useSearchParams` para nombre, estado, especie y página, y no con `useState`. Así se puede copiar el enlace y ver lo mismo en otra pestaña.

**3. Los cuatro estados en un componente.** Cargando, error, vacío y datos los resuelve `EstadoDatos`. El vacío está separado del error: una búsqueda sin resultados no es una falla.

**4. La sesión en un hook.** `useSesion` le pregunta a Supabase si ya hay una sesión (por eso sigue abierta al recargar) y escucha los cambios de entrada y salida, con su limpieza al desmontar.

**5. Comentarios en vivo.** `Comentarios` carga la lista y abre un canal de Supabase que escucha altas y bajas. Cada cambio se suma al estado partiendo del anterior (`setComentarios((previos) => ...)`), así no se pierde lo que ya estaba en pantalla, y el canal se cierra en la limpieza del efecto.

**6. La voz en un hook.** `useDictado` guarda la lógica del micrófono y el estado del permiso, y `Comentarios` solo decide qué hacer con el texto dictado.

Los favoritos siguen guardándose en `localStorage` con `useFavoritos`, solo con los datos que necesita la tarjeta (id, nombre, imagen, estado y especie).

## Autor

Franco Ezequiel Amadio. Trabajo individual: armé el proyecto completo (pantallas, cuentas, comentarios en vivo, dictado por voz y base en Supabase) con ayuda de IA, como explico abajo.

## Uso de IA

Usé una IA como guía para armar el proyecto: me fue explicando cada parte y yo lo fui armando paso a paso y probando que funcione, para poder explicarlo con mis palabras.