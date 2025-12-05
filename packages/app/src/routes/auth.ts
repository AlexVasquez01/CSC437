import { Router } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await UserModel.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: hashed
    });

    return res.status(201).json({
      message: "User created",
      username: user.username
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user)
      return res.status(401).json({ error: "Invalid username or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid username or password" });
    const token = jwt.sign(
      { username: user.username },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;