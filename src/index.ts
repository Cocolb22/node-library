import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source"; // connexion a ma base de données
import userRoutes from "./routes/UserRoutes";


const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173", // autorise l'accès à ton serveur depuis le frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
}));

app.use(express.json());

app.use("/users", userRoutes); //Import des routes pour les utilisateurs

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
