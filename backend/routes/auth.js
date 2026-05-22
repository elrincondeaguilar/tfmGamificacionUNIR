import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

const sheets = google.sheets("v4");
const BACKEND_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function resolveServiceAccountKeyPath(keyPath) {
  if (!keyPath) return null;
  return path.isAbsolute(keyPath)
    ? keyPath
    : path.resolve(BACKEND_DIR, keyPath);
}

// Crear GoogleAuth config dinámicamente
const googleAuthConfig = {
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
};

// Si existe GOOGLE_SERVICE_ACCOUNT_KEY_JSON, parsearlo (Render)
if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
  try {
    const keyData = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
    googleAuthConfig.credentials = keyData;
  } catch (error) {
    console.error("Error al parsear GOOGLE_SERVICE_ACCOUNT_KEY_JSON:", error);
  }
} else if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  // Usar archivo (desarrollo local)
  googleAuthConfig.keyFile = resolveServiceAccountKeyPath(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  );
}

const auth = new google.auth.GoogleAuth(googleAuthConfig);

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
// Columnas esperadas en 'Hoja 1':
// A: Email, B: Nombre, C: Password(hash), D: Matricula, E: Fecha,
// F: XP, G: Insignias (csv), H: Ranking, I: Escuadron, J: Héroe
const USERS_RANGE = "'Hoja 1'!A:J";
const RANKS = [
  { name: "Aprendiz", min: 0 },
  { name: "Explorador", min: 200 },
  { name: "Cientifico", min: 400 },
  { name: "Experto", min: 700 },
  { name: "Maestro Heroe", min: 900 },
];

// Obtener datos de Google Sheets
async function getSheetData(range) {
  try {
    const authClient = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    return response.data.values || [];
  } catch (error) {
    console.error("Error leyendo Google Sheets:", error);
    throw error;
  }
}

function ensureGoogleSheetsConfig() {
  if (!SPREADSHEET_ID) {
    throw new Error("Falta configurar GOOGLE_SHEETS_SPREADSHEET_ID");
  }

  if (!googleAuthConfig.credentials && !googleAuthConfig.keyFile) {
    throw new Error(
      "Falta configurar GOOGLE_SERVICE_ACCOUNT_KEY_JSON o GOOGLE_SERVICE_ACCOUNT_KEY",
    );
  }
}

function getRankName(xp) {
  return (
    [...RANKS].reverse().find((rank) => xp >= rank.min)?.name ?? RANKS[0].name
  );
}

async function updateSheetRow(rowNumber, values) {
  try {
    const authClient = await auth.getClient();
    const range = `'Hoja 1'!A${rowNumber}:J${rowNumber}`;
    await sheets.spreadsheets.values.update({
      auth: authClient,
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      resource: { values: [values] },
    });
  } catch (error) {
    console.error("Error actualizando Google Sheets:", error);
    throw error;
  }
}

function parseUserRow(row) {
  return {
    email: row[0] ?? "",
    nombre: row[1] ?? "",
    passwordHash: row[2] ?? "",
    matricula: row[3] ?? "",
    fecha: row[4] ?? "",
    xp: Number(row[5] ?? 0),
    insignias: (row[6] || "").split(",").filter(Boolean),
    ranking: row[7] ?? "",
    escuadron: row[8] ?? "",
    heroe: row[9] ?? "",
  };
}

async function findUserRowByEmail(email) {
  const rows = await getSheetData(USERS_RANGE);
  // rows is array of arrays, header row may exist; search full rows
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if ((row[0] || "").toLowerCase() === email.toLowerCase()) {
      // rowNumber in Sheets is i+1 (because API returns including header if present)
      // If your sheet has header in row 1, first data row is 2. We'll compute actual row by index+1.
      const rowNumber = i + 1;
      return { rowNumber, row };
    }
  }
  return null;
}
// Escribir datos en Google Sheets
async function appendToSheet(range, values) {
  try {
    const authClient = await auth.getClient();
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [values],
      },
    });
  } catch (error) {
    console.error("Error escribiendo en Google Sheets:", error);
    throw error;
  }
}

function parseRankingUsers(rows) {
  return rows
    .map(parseUserRow)
    .filter((user) => user.email.includes("@") && Number.isFinite(user.xp))
    .map((user) => ({
      email: user.email,
      nombre: user.nombre,
      matricula: user.matricula,
      xp: user.xp,
      ranking: getRankName(user.xp),
      insignias: user.insignias,
      escuadron: user.escuadron,
      heroe: user.heroe,
    }))
    .sort((left, right) => {
      if (right.xp !== left.xp) {
        return right.xp - left.xp;
      }

      return left.nombre.localeCompare(right.nombre, "es");
    })
    .map((user, index) => ({
      position: index + 1,
      ...user,
    }));
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    ensureGoogleSheetsConfig();

    const { email, nombre, password, matricula, heroe } = req.body;

    if (!email || !nombre || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Obtener usuarios existentes
    const users = await getSheetData(USERS_RANGE);
    const userExists = users.some((row) => row[0] === email);

    if (userExists) {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const fecha = new Date().toISOString().split("T")[0];

    // Valores por defecto para progreso
    const xp = 0;
    const insignias = "";
    const ranking = getRankName(xp);
    const escuadron = "";

    // Agregar usuario a Google Sheets (columnas A..J)
    await appendToSheet(USERS_RANGE, [
      email,
      nombre,
      hashedPassword,
      matricula || "",
      fecha,
      String(xp),
      insignias,
      ranking,
      escuadron,
      heroe || "",
    ]);

    // Generar token JWT
    const token = jwt.sign({ email, nombre }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        email,
        nombre,
        matricula: matricula || "",
        xp,
        insignias: [],
        ranking,
        escuadron,
        heroe: heroe || "",
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    ensureGoogleSheetsConfig();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    // Obtener usuario por email
    const found = await findUserRowByEmail(email);
    if (!found) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const row = found.row;
    const userObj = parseUserRow(row);

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, userObj.passwordHash);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign({ email, nombre: userObj.nombre }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        email: userObj.email,
        nombre: userObj.nombre,
        matricula: userObj.matricula,
        heroe: userObj.heroe,
        xp: userObj.xp,
        insignias: userObj.insignias,
        ranking: getRankName(userObj.xp),
        escuadron: userObj.escuadron,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// PATCH /api/auth/progress - actualizar progreso del usuario (xp, insignias, ranking, escuadron)
router.patch("/progress", verifyToken, async (req, res) => {
  try {
    ensureGoogleSheetsConfig();

    const email = req.user?.email;
    if (!email) return res.status(400).json({ error: "Usuario inválido" });

    const { xp, insignias, escuadron } = req.body;

    const found = await findUserRowByEmail(email);
    if (!found) return res.status(404).json({ error: "Usuario no encontrado" });

    const { rowNumber, row } = found;
    const parsed = parseUserRow(row);

    const newXp = typeof xp === "number" ? xp : parsed.xp;
    const newRanking = getRankName(newXp);
    const newInsignias = Array.isArray(insignias)
      ? insignias.join(",")
      : insignias || (parsed.insignias || []).join(",");
    const newEscuadron = escuadron || parsed.escuadron;

    const updatedRow = [
      parsed.email,
      parsed.nombre,
      parsed.passwordHash,
      parsed.matricula,
      parsed.fecha,
      String(newXp),
      newInsignias,
      newRanking,
      newEscuadron,
      parsed.heroe || "",
    ];

    await updateSheetRow(rowNumber, updatedRow);

    res.json({
      message: "Progreso actualizado",
      user: {
        email: parsed.email,
        nombre: parsed.nombre,
        xp: newXp,
        insignias: (newInsignias || "").split(",").filter(Boolean),
        ranking: newRanking,
        escuadron: newEscuadron,
        heroe: parsed.heroe || "",
      },
    });
  } catch (error) {
    console.error("Error actualizando progreso:", error);
    res.status(500).json({ error: "Error actualizando progreso" });
  }
});

// GET /api/auth/ranking - obtener ranking global de usuarios
router.get("/ranking", verifyToken, async (req, res) => {
  try {
    ensureGoogleSheetsConfig();

    const rows = await getSheetData(USERS_RANGE);
    const ranking = parseRankingUsers(rows);

    res.json({ ranking });
  } catch (error) {
    console.error("Error obteniendo ranking:", error);
    res.status(500).json({ error: "Error obteniendo ranking" });
  }
});

// Middleware de verificación de JWT
export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
}

// GET /api/auth/me (verificar token)
router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
