import express from "express"
import dotenv from "dotenv"
import connectDB from "../database/dbConnect.js"
import cors from "cors"
import {registerUser,loginUser} from "./controllers/userController.js"
import {addTask,findAllTask} from "./controllers/taskController.js"
import { requireAuth } from "../middleware/requireAuth.js"

dotenv.config()
const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("works")
})

app.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint",requireAuth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});

app.post("/register",registerUser)
app.post("/login",loginUser)
app.get("/task",requireAuth,findAllTask)
app.post("/task/add",requireAuth,addTask)



app.listen(port,()=>{
    console.log("listening on port " + port)
})

connectDB()