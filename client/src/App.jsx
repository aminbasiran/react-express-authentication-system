import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link,Outlet } from 'react-router-dom'

function App() {
  const [user,setUser] = useState({})
  const [inventory,setInventory] = useState([])
  const [isLoading,setisLoading] = useState(true)


  const value = {
    user,setUser,isLoading,setisLoading,inventory,setInventory

  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-row gap-4 justify-center'>
        <Link to="/home">HOME</Link>
        <Link to="/register">REGISTER</Link>
        <Link to="/login">LOGIN</Link>
      </div>
      <Outlet context={value}/>
    </div>
  )
}

export default App
