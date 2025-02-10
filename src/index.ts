import express from "express";
import session from "express-session";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes";
import dotenv from "dotenv";

// Configuration de dotenv
dotenv.config();


const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173", // autorise l'accès à ton serveur depuis le frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
  credentials: true, // Autorise l'envoi de cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const expiryDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    expires: expiryDate,
  },
}));

app.use("/users", userRoutes); //Import des routes pour les utilisateurs
app.use("/auth", authRoutes); //Import des routes pour l'authentification

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to PostgreSQL!");
    // Start the server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Error connecting to the database", error);
  });
