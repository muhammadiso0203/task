import { Router } from "express";
import { taskController } from "../controller/taskController.js";

const router = Router()
const controller = new taskController();

router
    .post('/', controller.createTask)
    .get('/', controller.getAllTask)
    .get('/:id', controller.getTaskById)
    .patch('/:id', controller.updateById)
    .delete('/:id', controller.deleteTaskById);

export default router;