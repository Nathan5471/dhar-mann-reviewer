import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
} from "../controllers/authController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    await registerUser(req, res);
  } catch (error) {
    console.error("Error during registration route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    await loginUser(req, res);
  } catch (error) {
    console.error("Error during login route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", async, (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/self", authenticate, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user._id,
      username: user.username,
      accountType: user.accountType,
    });
  } catch (error) {
    console.error("Error during get self route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    await getUser(req, res);
  } catch (error) {
    console.error("Error during get user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete", authenticate, async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    console.error("Error during delete user route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
