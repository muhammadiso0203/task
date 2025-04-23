import { model, Schema } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true, trim: true },
    
    role: { type: String, enum: ['owner', 'assignee', 'wiever'], required: true, default: 'wiever' },
    
    description: { type: String, default: '' },
    
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    
}, { timestamps: true });

const Task = model('Task', taskSchema);
export default Task;
