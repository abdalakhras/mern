import React from "react";
import { useAuth } from "../../context/authContext";
import Button from "@mui/material/Button";

const Dashboard = ()=>{

    const {logOut} = useAuth()

    return (
    <>
    <h1>welcome to Admin Dashboard</h1>
    <h2> you are an Admin</h2>
    <Button onClick={logOut}>logOut</Button>
    </>
)
}
export default Dashboard