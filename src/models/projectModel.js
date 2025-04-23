import { model, Schema } from 'mongoose'

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const Project = model('Project', projectSchema);
export default Project;