import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAllUsers } from '../../services/auth';
import { deleteUser } from '../../services/auth';
import { UpdateUserInfo } from '../../services/auth';
import { useEffect, useState } from 'react';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function BasicTable() {

// this is for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // this is only for the password
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  
    const [users,setUsers] = useState([])
    const [userId,setUserId] = useState(null)
    const [form,setForm] = useState({
      username:'',
      email:'',
      role:'',
      id: ''
    })

   
        
const getUsers = async () => {
    
    try {
        const data = await getAllUsers()
        console.log(data)
        setUsers(data)
    } catch (error) {
        console.log(error.message)
    }
}

 useEffect(()=>{
getUsers()
    },[])


    // i think this needs to be inside a use effect ??
   const Delete = async (id)=>{
 try {
    if(!id){
     console.log('id is not ready')
    }else{
        const data = await deleteUser(id)
        getUsers()
    }
    
 } catch (error) {
    alert(error.message)
 }   
}


const onSubmit = async (e) => {
  e.preventDefault()
  handleClose()
  console.log(form)
  try {
    const data = await UpdateUserInfo(form.username,form.email,form.role,form.id)
    console.log(data)
    getUsers()
  } catch (error) {
     console.log(error.message)
     alert(error.message)
  }
}
  
  




  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>username</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">role</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">action</TableCell>
            <TableCell align="right">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row._id}</TableCell>
              <TableCell align="right"><Button onClick={()=>{
                Delete(row._id)
                
              }}>delete</Button></TableCell>
              <TableCell align='right'><Button onClick={()=>{
                handleOpen()
                setUserId(row._id)
                setForm({...form,id:row._id})
                console.log(userId)
              }}>update</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* this is Update Modal */}
       <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            update user info
          </Typography>
          <form onSubmit={onSubmit} id="modal-modal-description" sx={{ mt: 2 }}>
           <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          // required
          id="outlined-required"
          label="username"
          defaultValue="Hello World"
          onChange={(e)=>(setForm({...form,username:e.target.value}))}
        />
        <TextField
          // required
          id="outlined-required"
          label="email"
          defaultValue="Hello World"
          onChange={(e)=>(setForm({...form,email:e.target.value}))}
        />
        <TextField
          // required
          id="outlined-required"
          label="role"
          defaultValue="Hello World"
          onChange={(e)=>(setForm({...form,role:e.target.value}))}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="userId"
          defaultValue= {userId}
          
        />
        
        {/* this is only for the Old password */}
       <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Old-Password</InputLabel>
          <OutlinedInput
            id="Old-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>
    </Box>
            <Button type='submit'>submit changes</Button>
          </form>
        </Box>
      </Modal>
    </div>
    </TableContainer>
  );
}
