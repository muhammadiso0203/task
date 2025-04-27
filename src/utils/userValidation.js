import Joi from "joi";

const user = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(4).required(),
    password: Joi.string().min(8).max(25).required(),
    role: Joi.string().valid('owner', 'assignee', 'wiever')
});

export const userValidator = (data) => {
    return user.validate(data);
}