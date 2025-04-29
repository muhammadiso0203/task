import { Router } from "express";
import { userController } from "../controller/userController.js";
// import { JwtAuthGuard } from "../middleware/jwtAuthGuard.js"

const router = Router();
const controller = new userController();

router 
    .post("/", controller.createUser)
    .post("/signin", controller.signinUser)
    .post("/confirm-signin", controller.confirmSigninUser)
    .post("/signout", controller.signoutUser)
    .post("/token", controller.accesToken)
    .get("/", controller.getAllUsers)
    .get("/:id", controller.getUserById)
    .put("/:id", controller.updateById)
    .delete("/:id", controller.deleteById)

export default router;
