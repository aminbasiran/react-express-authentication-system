import React from 'react'
import { useOutletContext, Navigate, Outlet} from "react-router-dom";

const RequireAuth = () => {

    const {user,isLoading,inventory,setInventory} = useOutletContext()
    
    return (
        <>
            {user?.email ?  <Outlet context={{user,isLoading,inventory,setInventory}}/>: <Navigate to="/login" replace:true/> }
        </>
    )
}

export default RequireAuth
