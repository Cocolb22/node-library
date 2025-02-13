import { Router } from "express";
import { UserService } from "../services/UserService";

const router = Router();
const userService = new UserService();

// CREATE User
router.post("/", async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
});

// READ All Users
router.get("/", async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

// READ Single User
router.get("/:id", async (req, res) => {
  const user = await userService.findById(Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// UPDATE User
router.put("/:id", async (req, res) => {
  const updatedUser = await userService.update(Number(req.params.id), req.body);
  if (req.session.user && updatedUser) {
    req.session.user = updatedUser;
  }
  res.json(updatedUser);
});

// DELETE User
router.delete("/:id", async (req, res) => {
  await userService.delete(Number(req.params.id));
  req.session.destroy(() => console.log("User destroyed"));
  res.status(204).send();
});

export default router;
