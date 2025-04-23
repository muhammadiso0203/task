import { Router } from "express";
import { taskController } from "../controller/taskController.js";
import { ownerGuard } from "../middleware/ownerGuard.js";
import { selfGuard } from "../middleware/selfAdminGuard.js";

const router = Router()
const controller = new taskController();

router
    .post('/', ownerGuard, controller.createTask)
    .get('/', controller.getAllTask)
    .get('/:id', selfGuard, controller.getTaskById)
    .patch('/:id', controller.updateById)
    .delete('/:id', ownerGuard, controller.deleteTaskById);

export default router;