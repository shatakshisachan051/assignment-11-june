const express=require("express")

const userRoutes= require("./routes/user.routes");

const dotenv= require("dotenv")

const morgan = require("morgan");

const connectDB=require("./config/db")


dotenv.config();

const app=express();

app.use(express.json());

app.use(morgan("dev"));


app.get("/",(req,res)=>{
    res.send("app is running")
})


const PORT = process.env.PORT;


connectDB().then(()=>{

        app.use("/users",userRoutes)


    app.listen(PORT,()=>{
        console.log('Server is running on 3000')
    })
})

