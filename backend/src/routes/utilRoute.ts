import express from "express";
import * as utilsController from "./../controllers/utilController";

const utilRoute = express.Router();

utilRoute.post("/contact", utilsController.contactMail);

export default utilRoute;
