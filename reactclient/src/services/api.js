import axious from "axios"

const api = axious.create({
    baseURL : 'http://localhost:5002/api',
    timeout:15000,
})
//login interceptors to add token to headers

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers['auth'] = token
    }
    return config
}, (error)=>{
    return Promise.reject(error)
})

export default api