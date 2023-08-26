import express from "express";
import authController from "../controllers/authController";
import multerUpload from "../utils/multer";
import { protect } from "../middleware/authMiddleware";

const authRoute = express.Router();

authRoute.post("/register", multerUpload.none(), authController.register);
authRoute.post("/login", multerUpload.none(), authController.login);
authRoute
  .route("/profile")
  .get(protect, authController.getProfile)
  .patch(protect, authController.updateProfile);

export default authRoute;
