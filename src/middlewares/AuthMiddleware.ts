import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '17AW4gkUlfyi1Q2lJ9AjnD5cWaYGk0oXLIj9PCftJH0=';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.session.token;

  console.log("🔹 Token récupéré depuis la session:", token);
  console.log("Session actuelle :", req.session);

  if (!token) {
    res.status(401).json({ message: 'Non authentifié' });
    return;
  }
  jwt.verify(
    token,
    SECRET_KEY,
    (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Token invalide ou expiré' });
        return;
      }
      req.user = decoded;
      next();
    }
  );
};
