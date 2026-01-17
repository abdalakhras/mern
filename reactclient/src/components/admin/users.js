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
import { AddNewUser } from '../../services/auth';
import { updatePassByAdmin } from '../../services/auth';
import { useEffect, useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';

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
  // p: 4,
  pt: 2,
  px: 4,
  pb: 4,
};



export default function BasicTable() {

// this is for update modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //this is for child modal 
   const [openChild, setOpenChild] = React.useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };


// this is for adduser modal
   const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  
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
    const [email,setEmail] = useState('')
    const [username,setUserName] = useState('')
    const [role,setRole] = useState('')
    const [form,setForm] = useState({ 
      username:'',
      email:'',
      role:'',
      id: ''
    })

    const [addForm,setAddForm] = useState({
      username:'',
      email:'',
      role:'',
      password:''
    })

    const AddUser = async (e)=>{
      e.preventDefault()
      handleClose1()

      try {
        const data = await AddNewUser(addForm.username,addForm.email,addForm.role,addForm.password)
        console.log(data)
        getUsers()
      } catch (error) {
        console.log(error.message)
        alert(error.message)
      }
    }
   
        
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
    <>
    <Button onClick={()=>{
      handleOpen1()
    }}>Add new User</Button>

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
                setEmail(row.email)
                setUserName(row.username)
                setRole(row.role)
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
          label='username'
          defaultValue={username}
          onChange={(e)=>(setForm({...form,username:e.target.value}))}
        />
        <TextField
          // required
          id="outlined-required"
          label='email'
          defaultValue={email}
          onChange={(e)=>(setForm({...form,email:e.target.value}))}
        />
        <TextField
          // required
          id="outlined-required"
          label="role"
          defaultValue={role}
          onChange={(e)=>(setForm({...form,role:e.target.value}))}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="userId"
          defaultValue= {userId}
          
        />
        {/* this is for child modal  */}

          <React.Fragment>
      <Modal
        open={openChild}
        onClose={handleCloseChild}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">update password</h2>

           {/* this is only for the Old password */}
       <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New-Password</InputLabel>
          <OutlinedInput
            id="New-password"
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

          <Button onClick={handleCloseChild}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>


        </div>
    </Box>
            
            <Button type='submit'>submit changes</Button>
            <Button onClick={handleOpenChild}>update passowrd</Button>
            <Button type='button' onClick={handleClose}>cancel</Button>
          </form>
        </Box>
      </Modal>
    </div>

  {/* this is add new user mopdal */}
       <div>
   
      <Modal
        open={open1}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            add new user info
          </Typography>
           <form onSubmit={AddUser} id="modal-modal-description" sx={{ mt: 2 }}>
            
          
           <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label='username'
          defaultValue=''
          onChange={(e)=>(setAddForm({...addForm,username:e.target.value}))}
        />
        <TextField
          required
          id="outlined-required"
          label='email'
          defaultValue=''
          onChange={(e)=>{setAddForm({...addForm,email:e.target.value})}}
        />
        <TextField
          required
          id="outlined-required"
          label="role"
          defaultValue=''
          onChange={(e)=>(setAddForm({...addForm,role:e.target.value}))}
        />
        <TextField
          required
          id="outlined-required"
          label="password"
          defaultValue= ''
          onChange={(e)=>{setAddForm({...addForm,password:e.target.value})}}
        />
        </div>
        </Box>
        <Button type='submit'>submit</Button>
        <Button type='button' onClick={handleClose1}>close</Button>
         </form>
          
          </Box>
      </Modal>
    </div>
    </TableContainer>
    </>
  );
}
