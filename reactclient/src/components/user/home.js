import React from "react";
import { useAuth } from "../../context/authContext";
import Button from "@mui/material/Button";


const Home = ()=>{

    const {user,logOut} = useAuth()
    console.log(user)
    return(
        <div>
        <h1>welcome to user homepage</h1>
        <h2>hello {user ? user.username : 'guest'}</h2>
        <p>this is user home page</p>
        <Button onClick={logOut}>logOut</Button>
        <a href="/userProfile">userCrud</a>
        </div>
    )
}
export default Home