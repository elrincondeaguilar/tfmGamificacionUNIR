# Juego - Academia de Héroes Científicos

Descripción en español y guía técnica del proyecto.

**Resumen del proyecto**

- **Qué es:** Un juego educativo web que simula la "Academia de Héroes Científicos", con actividades, misiones y un sistema de progresión por XP e insignias.
- **Usuario objetivo:** Estudiantes y docentes que usan actividades gamificadas para aprender física y trabajo cooperativo.
- **Componentes principales:** interfaz frontend interactiva (React/Vite) y backend Node.js para autenticación y gestión de datos.

**Estructura del repositorio**

- **Frontend:** [frontend](frontend)
  - Código principal en [frontend/src](frontend/src)
  - Componentes UI en [frontend/src/components/ActivityPages.jsx](frontend/src/components/ActivityPages.jsx)
- **Backend:** [backend](backend)
  - Servidor y routes en [backend/server.js](backend/server.js) y [backend/routes/auth.js](backend/routes/auth.js)
  - Credenciales de servicio (no compartir): [backend/service-account-key.json](backend/service-account-key.json)
- **Assets:** [assets](assets) contiene CSS y JS estáticos usados por la aplicación.

**Tecnologías y dependencias**

- **Frontend:** React, Vite, librerías de UI y utilidades JS (ver [frontend/package.json](frontend/package.json)).
- **Backend:** Node.js (Express), middleware de autenticación y lógica de rutas (ver [backend/package.json](backend/package.json)).
- **Servicios externos:** integración con servicios de hosting y autenticación (archivo de cuenta de servicio sugiere uso de Firebase/Google Cloud). Revisar [backend/service-account-key.json](backend/service-account-key.json) para más contexto.

**Requisitos previos**

- Node.js (recomendado: 14.x o superior). Verificar con `node -v`.
- npm o yarn para instalar dependencias.
- Acceso a las credenciales de servicio si se usa Firebase/Google Cloud (no subir estas claves al repositorio público).

**Configuración y ejecución local**

1. Clonar el repositorio y situarse en la raíz del proyecto.
2. Backend:
   - Entrar en la carpeta `backend`.
   - Instalar dependencias: `npm install`.
   - Configurar variables de entorno (si aplica). Comprueba `backend/server.js` para nombres esperados.
   - Ejecutar: `npm start` o `node server.js` (ver `backend/package.json` para scripts exactos).
3. Frontend:
   - Entrar en la carpeta `frontend`.
   - Instalar dependencias: `npm install`.
   - Ejecutar en modo desarrollo: `npm run dev` (Vite) o el script definido en `frontend/package.json`.
4. Abrir la UI en el navegador (por defecto Vite suele usar `http://localhost:5173`).

**Variables de entorno y secretos**

- No comitear `backend/service-account-key.json` ni ninguna credencial.
- Configurar variables de entorno para claves API, URL del backend y credenciales de terceros según `backend/server.js` y `frontend/config/api.js`.

**Aspectos técnicos importantes**

- Autenticación: el backend contiene rutas de autenticación en [backend/routes/auth.js](backend/routes/auth.js). Verificar esquema de tokens/session (JWT, Firebase tokens, etc.).
- Seguridad:
  - Proteger la cuenta de servicio y variables sensibles.
  - Usar HTTPS en producción.
  - Configurar CORS mínimamente para permitir el dominio del frontend.
- Integración con servicios externos: revisar llamadas en [frontend/src/config/api.js](frontend/config/api.js) y en el backend para endpoints y credenciales.
- Persistencia: confirmar si los datos (usuarios, puntuaciones, insignias) se guardan en Firebase, Firestore u otro servicio; la presencia de `service-account-key.json` sugiere Google Cloud/Firebase.
- Frontend:
  - Componentes clave: [frontend/src/components/ActivityPages.jsx](frontend/src/components/ActivityPages.jsx) y otros componentes React en [frontend/src/components](frontend/src/components).
  - Uso de iframes/embebidos: algunas actividades usan iframes (Genially) y escuchan mensajes postMessage para marcar finalización.

**Despliegue**

- Frontend: puede desplegarse como sitio estático (Netlify, Vercel, GitHub Pages). El repositorio incluye `netlify.toml` para configuración de Netlify.
- Backend: desplegar en Node.js-compatible host (Heroku, Render, Cloud Run, VPS). Asegurarse de configurar las variables de entorno y credenciales.

**Pruebas y desarrollo**

- Revisar y ejecutar scripts en `package.json` de cada carpeta para lint, build y test (si existen).
- Para cambios UI, usar `npm run dev` en `frontend` y recargar en caliente.

**Buenas prácticas y recomendaciones**

- Mantener las credenciales fuera del repositorio: usar variables de entorno o secretos del proveedor de despliegue.
- Añadir un `.env.example` que documente las variables de entorno necesarias.
- Añadir validación y manejo de errores robusto en el backend para evitar estados inconsistentes.
- Documentar los endpoints públicos del backend (README o Swagger/OpenAPI).

**Contribuir**

- Workflow sugerido: ramas feature, PRs, revisión de código.
- Añadir issues y describir el flujo de datos para cambios grandes.

**Contacto y referencias**

- Archivos clave para revisar primero:
  - [frontend/src/components/ActivityPages.jsx](frontend/src/components/ActivityPages.jsx)
  - [frontend/src](frontend/src)
  - [backend/server.js](backend/server.js)
  - [backend/routes/auth.js](backend/routes/auth.js)

Si quieres, puedo:

- Añadir un `.env.example` con las variables detectadas.
- Crear un script de despliegue o instrucciones automatizadas.
