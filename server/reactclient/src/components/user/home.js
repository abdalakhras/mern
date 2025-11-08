import React from "react";
import { useAuth } from "../../context/authContext";


const Home = ()=>{

    const {user} = useAuth()
    console.log(user)
    return(
        <div>
        <h1>welcome to user homepage</h1>
        <h2>hello {user ? user.username : 'guest'}</h2>
        <p>this is user home page</p>
        </div>
    )
}
export default Home