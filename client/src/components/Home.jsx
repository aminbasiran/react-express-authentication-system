import React,{useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from "axios"




const Home = () => {


    useEffect(() => {
        const fetchAllTasks = async () => {
          try {
            const response = await axios.get('http://localhost:3000/task',{headers : {
                'Authorization': `Bearer ${token}`
            }}); 
            setInventory([...response.data.data.tasks]);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
    
        fetchAllTasks();
      }, []); 

    const {user,inventory,setInventory} = useOutletContext()
    const {email,token} = user

    const [task,setTask] = useState("")

    const handleAddTask = async () => {

        try {
            const response = await axios.post('http://localhost:3000/task/add', {task},{headers: {
                'Authorization': `Bearer ${token}`
            }});

            setInventory(prev => [...prev, response.data.data.task.task])
        } 
        
        
        catch (error) {
            console.log(error)
        }

        finally{
            setTask("")
        }
    }
    
    return (
        <div>
            <h1>User: {email}</h1>
            <div className='flex gap-4 justify-center'>
                <input  className=" p-3" type="text" value={task} onChange={e=>setTask(e.target.value)} placeholder='add task' />
                <button onClick={handleAddTask} className="p-3 cursor-pointer bg-indigo-400" type='button'>Add</button>
            </div>
            <div className='my-8'>
                <h1>Tasks</h1>
                {inventory && inventory.map((item,index) => <h1 key={index}>{item}</h1>)}
            </div>
        </div>
    )
}

export default Home
