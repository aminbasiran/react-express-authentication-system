import {nanoid} from "nanoid"
import tasks from "../../schema/taskSchema.js"



const findAllTask = async(req,res)=> {
    const {userID} = req.user

    try {
        const allTasks  = await tasks.find({userID})
        const onlyTaskString  = []

        allTasks.forEach(eachTask => {
            onlyTaskString.push(eachTask.task)
        })

        res.status(201).send({
            message: "Tasks retrieved successfully",
            data:{
                tasks : onlyTaskString
            }
        });
    } 
    
    
    
    catch (error) {
        res.send(error)    
    }


}



const addTask = async (req,res) =>{
    const {userID} = req.user
    const {task} = req.body


    if(!task){
        return res.send("please enter task")
    }

    try {
        const requestBody =  {
            userID : userID,
            task : task,
        }
    
        const createdTask = await tasks.create(requestBody)
        res.status(201).send({
            message: "task Created Successfully",
            data:{
                task : createdTask
            }
        });
    } 
    
    
    
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

}


export {addTask,findAllTask}