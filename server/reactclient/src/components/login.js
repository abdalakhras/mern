import {React,useState} from "react";
import { useAuth } from "../context/authContext";


const Login = ()=>{

    const {login} = useAuth()
    const [form,setForm] = useState({
        email:'',
        passowrd:"",
    }) 
    const [error,setError] = useState('')
    const onSubmit = async (e)=>{
        e.preventDefault()
        setError('')
        try {
            const data = await login(form.email,form.passowrd)
            console.log(data)
           window.location.href = '/home'
        } catch (error) {
            setError(error.response.data.message)
        }

    }

    return(
        <div className="container mt-5">
            <form id="loginForm" onSubmit={onSubmit} >
                <div className="form-outline mb-4">
                    <input onChange={(e)=>setForm({...form,email:e.target.value})} type="email" id="form2Example1" className="form-conrtol"placeholder="Email Address"/>
                </div>
                <div className="form-outline mb-4">
                <input onChange={(e)=>setForm({...form,passowrd:e.target.value})} type="password" id="form2Example1" className="form-conrtol" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">sign in</button>
            </form>
        </div>
    )
}
export default Login