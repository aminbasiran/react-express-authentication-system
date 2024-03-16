import React,{useState} from 'react'
import { Link,useOutletContext,useNavigate } from 'react-router-dom'
import axios from "axios"
import Cookies from "universal-cookie";

const Login = () => {
    const cookies = new Cookies();

    const {setUser} = useOutletContext()
    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {email,password}

        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            console.log(response.data.data)
            setUser(response.data.data)
            // cookies.set("TOKEN", response.data.data.token, {
            //     path: "/",
            // });
            navigate("/home")


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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className='flex-col flex gap-3'>
                <input className="p-3" type="text" placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                <input className="p-3" type="text" placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="p-3 bg-indigo-400 " type='submit'>Submit</button>
            </div>
        </form>
        <h1>Don't have account? <Link to="/register">Click here</Link></h1>

        </div>
    )
}

export default Login
