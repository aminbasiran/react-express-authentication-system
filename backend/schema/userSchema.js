import mongoose from "mongoose"


const {Schema } = mongoose
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique:false
    },
}, { timestamps: true })

const user = mongoose.model('user', userSchema);
export default user;