import Task from "../models/taskModel.js";
import { catchError } from "../utils/error-response.js";
import { taskValidation } from "../utils/taskvalidation.js";

export class taskController {
    async createTask(req, res) {
        try {
            const { error, value } = taskValidation(req.body);
            if (error) {
                throw new Error(`Error on creating task: ${error}`)
            }

            const {title, description, status} = value
            const newTask = await Task.create({
                title, description, status
                
            });
            return res.status(201).json({
                statusCode: 201,
                message: 'succes',
                data: newTask
            })
            ;
            
        } catch (error) {
            catchError(error, res)
        }
    }

    async getAllTask(_, res) {
        try {
            const tasks = await Task.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'succes',
                data: tasks
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getTaskById(req, res) {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: task
            });
        } catch (error) {
            catchError(error, res)
        }
    }

    async updateById(req, res) {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updateTask
            })
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteTaskById(req, res) {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            await Task.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}