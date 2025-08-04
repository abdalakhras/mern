const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

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
app.get("/hey",(req,res)=>{
    res.send("this is a response from the local host server : you visited hey path")
})
app.put("/test",(req,res)=>{
    res.send("this is a response from localhost : you are on test page")
})
app.get("/kjkj",(req,res)=>{
    // res.send(`the server response for the get request is my name :  ${req.body.name}`)
    res.json({
        name : req.body.name,
        age : req.body.age, 
        Password:'not available'
    })
    console.log(req.body.age)
})


const PORT = process.env.PORT
app.listen(PORT,()=>{

console.log(`server is running on port ${PORT}`)
})