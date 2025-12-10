
import api from "./api";

export async function loginForm(email,password) {
    
    const {data} = await api.post('users/userlogin',{email,password})
    localStorage.setItem('token',data.token)
    localStorage.setItem('user',JSON.stringify(data.user))
    return data
}

export async function logOut () {
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export  function getCurrenUser() {
    
    const raw = localStorage.getItem('user')
    if(!raw) return null
    const user = JSON.parse(raw)
    return user
}

export async function Register(username,email,password,role) {
    const {data} = await api.post('users/create',{username,email,password,role})
    localStorage.setItem('user',JSON.stringify(data.user))
    return data
}

export async function userUpdate(username,email,passowrd) {
    const {data} = await api.put('/users/updateuser',{username,email,passowrd})
    localStorage.setItem('user',JSON.stringify(data.updatedUser))
    return data
}

export async function getAllUsers() {
    const {data} = await api.get('/users/getusersdata')
    localStorage.setItem('Allusers',JSON.stringify(data))
    return data
}