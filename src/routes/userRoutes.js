import { Router } from "express";
import { userController } from "../controller/userController.js";
import { JwtAuthGuard } from "../middleware/jwtAuthGuard.js"

const router = Router();
const controller = new userController();

router 
    .post("/", controller.createUser)
    .post("/signin", controller.signinUser)
    .post("/signout", JwtAuthGuard, controller.signoutUser)
    .post("/token", controller.accesToken)
    .get("/", controller.getAllUsers)

export default router;
