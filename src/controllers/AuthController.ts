import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET!;

declare module "express-session" {
  interface SessionData {
    token: string;
    user: User;
  }
}

export class AuthController {
  // Méthode pour l'inscription
  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

       // Vérifier si l'utilisateur existe déjà
      const existingUser = await AppDataSource.getRepository(User).findOneBy({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Création de l'utilisateur
      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      const token = jwt.sign({ id: newUser.id, email: email }, SECRET_KEY, {
        expiresIn: "1h",
      });
      req.session.token = token;
      req.session.user = newUser;
      console.log("Session actuelle :", req.session);

      res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // Méthode pour la connexion
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Recherche de l'utilisateur par email
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Génération du token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      req.session.token = token;
      req.session.user = user;
      console.log("User dans session :", req.session.user);

      res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Récupérer utilisateur connecté
   async getCurrentUser(req: Request, res: Response) {

    if (!req.session.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    res.status(200).json({
      user: req.session.user,
    });
  }

  async getValidToken(req: Request, res: Response) {
    if (!req.session.token) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    res.status(200).json({
      token: req.session.token,
    });
  }

  // Méthode pour la déconnexion
  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "User logged out successfully" });
      console.log("Session supprimée");

    });
  }
}
