import {React,useState,useEffect} from "react";
import { useAuth } from "../../context/authContext";
import { getAllUsers } from "../../services/auth";

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'username', width: 130 },
  { field: 'email', headerName: 'email', width: 130 },
  {
    field: 'role',
    headerName: 'role',
    type: 'number',
    width: 90,
  },
//   {
//     field: 'password',
//     headerName: 'password',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, email: 'Snow', username: 'Jon', role: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };



export default function UsersAdmin(){
    
const [users,setUsers] = useState([])
    
const usersx = users ? users.map((user)=>(
{ id: user._id, email: user.email, username: user.username, role: user.role }
)) : []
  
console.log(usersx)
useEffect(()=>{

    async function getUsers() {
        
        try {
        var data = await getAllUsers()
        console.log(data)
        setUsers(data)
    } catch (error) {
        console.log(error)
    }

    }
 getUsers()
    
},[])
   
console.log(users)





    return(
        <>
        <h1>Wlecom to main Users component</h1>

         <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={usersx}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
        </>
    )
}