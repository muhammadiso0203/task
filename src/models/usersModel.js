import mongoose, { model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'manager'], default: 'user' },
    task_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true},
})

const User = model('users', userSchema);
export default User;