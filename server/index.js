const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

const User = require('./models/user')

const userRouter  = require('./routers/userRouters')

dotenv.config()
connectDB();

const app = express()
app.use(express.json());

app.use('/api/users',userRouter)

// app.get("/hello/:number1/:number2",(req,res)=>{
//     const num1 = req.params.number1
//     const num2 = req.params.number2
//     const total =  Number(num1)+Number(num2)
//      console.log(num1,"/",num2,'=',total)
// res.send(`welcom to local host in hello page where number1 and number2 ${num1}/${num2} and the total is ${total}`)
// })
// app.get("/hey",(req,res)=>{
//     res.send("this is a response from the local host server : you visited hey path")
// })
// app.put("/test", async (req,res)=>{

//     // const userName = req.body.name
//     const Email = req.body.email
//     const Password = req.body.password

//     const newUser = new User({
//         username :req.body.name,
//         email:Email,
//         password : Password,
//     })
//     await newUser.save()
//     res.send("data is being stored in mongoDB")
// })

// app.get("/test",async(req,res)=>{
//  const xUSer = await User.find()
//  res.json(xUSer)
// })

// app.delete("/test/:testId",async(req,res)=>{
//     const id = req.params.testId
//     try{
//  const xUSer = await User.findByIdAndDelete(id)
//  res.json(xUSer)
//  return
//     }catch(error){
//         console.log("error")
//         res.send(error)
//         return
//     }
// })


// app.get("/kjkj",(req,res)=>{
//     // res.send(`the server response for the get request is my name :  ${req.body.name}`)
//     res.json({
//         name : req.body.name,
//         age : req.body.age, 
//         Password:'not available'
//     })
//     console.log(req.body.age)
// })


const PORT = process.env.PORT
app.listen(PORT,()=>{

console.log(`server is running on port ${PORT}`)
})