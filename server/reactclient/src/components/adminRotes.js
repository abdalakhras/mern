import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminAuth ({childern}){
    const {user} = useAuth()
    const token = localStorage.getItem('token')
    if(!user || !token || user.role !== 'Admin'){
        return <Navigate to='/' replace/>
    }
    return childern
}