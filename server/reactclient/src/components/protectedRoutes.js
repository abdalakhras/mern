import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

export default function ProtectedRoutes ({children}){

    const {user} = useAuth()
    const token = localStorage.getItem('token')
    if(!user || !token){
        return <Navigate to='/' replace/>

    }
    return children
}