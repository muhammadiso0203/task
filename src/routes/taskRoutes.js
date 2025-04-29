import { Router } from "express";
import { taskController } from "../controller/taskController.js";
// import { ownerGuard } from "../middleware/ownerGuard.js";
// import { selfGuard } from "../middleware/selfAdminGuard.js";

const router = Router()
const controller = new taskController();

router
    .post('/', controller.createTask)
    .get('/', controller.getAllTask)
    .get('/:id', controller.getTaskById)
    .patch('/:id', controller.updateById)
    .delete('/:id', controller.deleteTaskById);

export default router;