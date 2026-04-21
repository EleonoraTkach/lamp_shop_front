import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import https from "https";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const AUTH_KEY = process.env.AUTH_KEY;
let accessToken = null;
let tokenExpiresAt = 0; 

if (!AUTH_KEY) {
  throw new Error("AUTH_KEY не найден в .env");
}

const agent = new https.Agent({
  rejectUnauthorized: false,
});


async function getToken() {
  const response = await fetch(
    "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    {
      method: "POST",
      agent,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        RqUID: uuidv4(),
        Authorization: `Basic ${AUTH_KEY}`,
      },
      body: "scope=GIGACHAT_API_PERS",
    }
  );

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("Не удалось получить access_token");
  }

  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in || 1800) * 1000;

  return accessToken;
}

async function getValidToken() {
  if (!accessToken || Date.now() > tokenExpiresAt) {
    return await getToken();
  }
  return accessToken;
}


app.post("/chat", async (req, res) => {
  try {
	const token = await getValidToken();
	
    const response = await fetch(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        method: "POST",
        agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: "GigaChat",
          messages: [
            { role: "system", content: "Ты полезный ассистент" },
            ...req.body.messages,
          ],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Сервер работает 🚀" });
});

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});