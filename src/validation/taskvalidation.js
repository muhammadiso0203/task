import Joi from "joi";

const task = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(4).required(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending')
});

export const taskValidation = (data) => {
    return task.validate(data)
}