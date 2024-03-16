import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {email,password}

        try {
            const response = await axios.post('http://localhost:3000/register', formData);
            console.log('Response:', response.data);
        } 
        
        catch (error) {
            console.error('Error:', error);
        }

        finally{
            setEmail("")
            setPassword("")
        }

    }



    return (
        <div>
            <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className='flex-col flex gap-3'>
                <input className="p-3" type="text" placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                <input className="p-3" type="text" placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="p-3 bg-indigo-400 " type='submit'>Submit</button>
            </div>
        </form>
        <h1>Already have an account? <Link to="/login">Click here</Link></h1>

        </div>
    )
}

export default Register
