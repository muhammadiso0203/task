import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema({
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const Comment = model('Comment', commentSchema)
export default Comment;