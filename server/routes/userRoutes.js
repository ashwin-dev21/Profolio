import express from "express";
import {
  getUserById,
  getUserResumes,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword); // <-- Added
userRouter.post("/reset-password/:token", resetPassword); // <-- Added
userRouter.get("/data", protect, getUserById);
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;