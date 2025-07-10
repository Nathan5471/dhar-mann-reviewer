import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateToken = (userId) => {
  dotenv.config();
  if (!userId) {
    throw new Error("User ID is required to generate a token");
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }
  const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: "30d" });
  return token;
};

export default generateToken;
