# 📚 Guía de Configuración - Sistema de Autenticación

## 📋 Requisitos

- **Node.js** v18+
- **Google Cloud Console** (cuenta gratuita)
- **Google Sheets** (hoja de cálculo)

---

## 🔧 Paso 1: Configurar Google Sheets API

### 1.1 Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita las APIs:
   - **Google Sheets API**
   - **Google Drive API**

### 1.2 Crear cuenta de servicio

1. En la consola, ve a **Credenciales**
2. Crea una credencial de tipo "Cuenta de servicio"
3. Genera una clave JSON
4. Descarga el archivo y guárdalo en `/backend/service-account-key.json`

### 1.3 Compartir Google Sheet con la cuenta de servicio

1. Abre tu Google Sheet
2. Copia el email de la cuenta de servicio del JSON descargado:
   ```
   "client_email": "tu-email@appspot.gserviceaccount.com"
   ```
3. Comparte la hoja con ese email

### 1.4 Obtener el ID del Spreadsheet

1. La URL de tu Google Sheet es algo como:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=0
   ```
2. Copia el `[SPREADSHEET_ID]`

---

## 🛠️ Paso 2: Estructura de la Google Sheet

Crea una hoja con el nombre **"Usuarios"** con estas columnas:

| Email             | Nombre     | Password | Matricula | Fecha      |
| ----------------- | ---------- | -------- | --------- | ---------- |
| email@example.com | Juan Pérez | (hash)   | 2024001   | 2024-05-17 |

> El password se guarda automáticamente en hash (bcryptjs)

---

## ⚙️ Paso 3: Configurar el Backend

### 3.1 Instalar dependencias

```bash
cd backend
npm install
```

### 3.2 Crear archivo `.env`

Copia el contenido de `.env.example` y rellena tus datos:

```bash
cp .env.example .env
```

Edita `.env`:

```
PORT=5000
JWT_SECRET=tu_secret_key_muy_seguro_aqui_cambiar_esto_en_produccion
GOOGLE_SHEETS_SPREADSHEET_ID=tu_spreadsheet_id_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu_service_account_email@appspot.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY=./service-account-key.json
FRONTEND_URL=http://localhost:5173
```

### 3.3 Iniciar el backend

**Desarrollo (con auto-reload):**

```bash
npm run dev
```

**Producción:**

```bash
npm start
```

✅ Debería mostrar: `✅ Backend ejecutándose en puerto 5000`

---

## 📱 Paso 4: Configurar el Frontend

### 4.1 Instalar dependencias

```bash
cd .. # volver a raíz
npm install
```

### 4.2 Iniciar el servidor de desarrollo

```bash
npm run dev
```

✅ Debería abrir en `http://localhost:5173`

---

## 🔐 Flujo de Autenticación

### Login

1. Usuario ingresa email y contraseña
2. Backend verifica contra Google Sheets
3. Si es correcto, genera un token JWT
4. Token se guarda en `localStorage`
5. Usuario puede acceder a la aplicación

### Register

1. Usuario llena el formulario
2. Backend verifica que el email no exista
3. Hashea la contraseña con bcryptjs
4. Agrega fila a Google Sheets
5. Genera token JWT y guarda en `localStorage`

### Logout

1. Elimina el token de `localStorage`
2. Redirige a la página de login

---

## 📝 Variables de Estado

```javascript
// En localStorage se guardan:
localStorage.token; // Token JWT para autenticación
localStorage.user; // { email, nombre, matricula }
```

---

## 🧪 Prueba del Sistema

### Registrar usuario de prueba

**POST** `http://localhost:5000/api/auth/register`

```json
{
  "email": "estudiante@example.com",
  "nombre": "Juan Pérez",
  "password": "password123",
  "matricula": "2024001"
}
```

### Login de usuario

**POST** `http://localhost:5000/api/auth/login`

```json
{
  "email": "estudiante@example.com",
  "password": "password123"
}
```

---

## 🐛 Solución de Problemas

### Error: "No se puede leer Google Sheets"

- ✅ Verifica que el archivo `service-account-key.json` exista en `/backend/`
- ✅ Verifica que la hoja se llama exactamente "Usuarios"
- ✅ Verifica que compartiste la hoja con el email de la cuenta de servicio

### Error: "Email no coincide"

- ✅ Verifica que el `GOOGLE_SHEETS_SPREADSHEET_ID` sea correcto en `.env`
- ✅ Copia el ID directamente desde la URL

### Error: "JWT Token inválido"

- ✅ Limpia `localStorage` (abre DevTools, Console: `localStorage.clear()`)
- ✅ Reinicia la sesión

### CORS Error

- ✅ Verifica que `FRONTEND_URL` en `.env` sea `http://localhost:5173` (desarrollo)
- ✅ En producción, actualiza a tu dominio real

---

## 🚀 Despliegue (Producción)

Para desplegar a producción (Vercel, Render, Heroku):

1. **Backend** en [Render.com](https://render.com) o [Railway.app](https://railway.app)
2. **Frontend** en [Vercel](https://vercel.com)
3. Actualiza `FRONTEND_URL` y URL de API en producción
4. Usa variables de entorno seguros (no hardcodear secrets)

---

## 📚 Recursos

- [Google Sheets API Docs](https://developers.google.com/sheets)
- [JWT en JavaScript](https://jwt.io/)
- [Bcryptjs Docs](https://www.npmjs.com/package/bcryptjs)

¡Listo! 🎉
