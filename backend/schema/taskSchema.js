import mongoose from "mongoose"


const {Schema } = mongoose
const taskSchema = new Schema({
    userID: {type:String},
    task: {type: String,required: true},
}, { timestamps: true })

const tasks = mongoose.model('tasks', taskSchema);
export default tasks;