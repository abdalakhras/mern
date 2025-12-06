import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { userUpdate } from "../../services/auth";
import { useAuth } from "../../context/authContext";
import userImage from "../../images/userImage.jpg"

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

const UserCrud = ()=>{

     const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

     const [form,setform] = useState({
            username : '',
            email : '',
        })

        const [error,setError] = useState('')

        const onSubmit = async (e)=>{
            e.preventDefault()
            setError('')

            try {
                const data = await userUpdate(form.username,form.email)
                console.log(data)
                alert('user updated succefully')
                handleClose()
            } catch (error) {
                setError(error.message)
            }
        }

    const {user} = useAuth()
//   console.log(user)


    return(
        <div>
            <h1>here you can update your profile</h1>
                        <img src={userImage}/>
                    <h3>user name : {user.username}</h3>
                     <h3>user email : {user.email}</h3>
                      {/* <h3>{user.password}</h3> */}
                       <Button onClick={handleOpen}>update profile</Button>
                    <Button>delete</Button>
                        <Button onClick={handleOpen1}>update Password</Button>
             

           {/* this is a modal for username and email*/}
           
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={onSubmit}>
                <input onChange={(e)=>{
                    setform({...form,username:e.target.value})
                    console.log(e.target.value)
                    }} type="text" id=""   placeholder="edit username"/>
                <input onChange={(e)=>setform({...form,email:e.target.value})} type="email" id=""  placeholder="edit email" />
                <Button type="submit">submit</Button>
            </form>
          </Typography>
        </Box>
      </Modal>

      {/* this is amodal for password update */}
                    
                     <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form >
                <input type="password" id="" placeholder="old password"/>
                <input type="password" id="" placeholder="new password"/>
                <Button type="submit">confirm</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
                    
        </div>
    )
}
export default UserCrud