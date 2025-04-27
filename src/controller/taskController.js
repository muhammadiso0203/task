import { error } from "console";
import Task from "../models/taskModel.js";
import { catchError } from "../utils/error-response.js";
import { taskValidation } from "../utils/taskvalidation.js";
import e from "express";

export class taskController {
    async createTask(req, res) {
        try {
            const { error, value } = taskValidation(req.body);
            if (error) {
                catchError(res, 500, error)
            }

            const { title, description, status, role } = value;
            const newTask = await Task.create({
              title,
              description,
              status,
              role
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
            catchError(res, 500, error.message);
        }
    }

    async getTaskById(req, res) {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) {
                catchError(res, 404, error.message)
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: task
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async updateById(req, res) {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) {
                catchError(res, 404, error.message)
            }
            const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updateTask
            })
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async deleteTaskById(req, res) {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) {
                catchError(res, 404, error.message);
            }
            if (task.role === 'owner') {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Danggg'
                })
            }
            await Task.findByIdAndDelete(id);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}