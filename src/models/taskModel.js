import mongoose, { model, mongo, Schema } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true, trim: true },
    
    user_role: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    
    description: { type: String, default: '' },
    
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    
}, { timestamps: true });

const Task = model('Task', taskSchema);
export default Task;
