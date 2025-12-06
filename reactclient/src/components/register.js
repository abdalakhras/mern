import React, { useState } from "react";
import { Register as RegisterForm } from "../services/auth";


const Register = ()=>{

    const [form,setform] = useState({
        username : '',
        email : '',
        password : ''
    })
const [error,setError] = useState('')

    const onSubmit = async (e)=>{
        e.preventDefault()
        setError('')
        try {
            const data = await RegisterForm (form.username,form.email,form.password,form.role)
            console.log(data)
            alert('user rigesterd successfully')
            // window.location.href = '/login'
             console.log(data.message)
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="container mt-5">
            <form onSubmit={onSubmit} id="registerForm" >
                <div className="form-outline mb-4">
                    <input onChange={(e)=>setform({...form,username:e.target.value})} type="text" id="userName" className="form-conrtol"placeholder="userName"/>
                </div>
                <div className="form-outline mb-4">
                    <input onChange={(e)=>setform({...form,email:e.target.value})} type="email" id="Email" className="form-conrtol"placeholder="Email Address"/>
                </div>
                <div className="form-outline mb-4">
                <input onChange={(e)=>setform({...form,password:e.target.value})} type="password" id="Password" className="form-conrtol" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Rigester</button>
            </form>
        </div>
    )
} 

export default Register