import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    await authController.logout(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/get_current_user", async (req, res) => {
  try {
    await authController.getCurrentUser(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/get_valid_token", async (req, res) => {
  try {
    await authController.getValidToken(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
