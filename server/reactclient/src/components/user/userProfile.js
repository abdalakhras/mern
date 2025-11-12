import React from "react";
import { userUpdate } from "../../services/auth";
import { useAuth } from "../../context/authContext";


const UserCrud = ()=>{

    const {user} = useAuth()

    console.log(user)
    return(
        <div>
            <h1>here you can update your profile</h1>
           <table border={2}>
            <thead>
                <tr>
                <th>username</th>
                <th>email</th>
                <th>passowrd</th>
                <th>action</th>
                 <th>action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.username}</td>
                     <td>{user.email}</td>
                      <td>{user.password}</td>
                       <td>update</td>
                       <td>delete</td>
                </tr>
            </tbody>
           </table>
        </div>
    )
}
export default UserCrud