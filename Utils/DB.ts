import mongoose from "mongoose"
import env  from "dotenv"

env.config()

const URL:string = process.env.DB!

export const dbConfig = ()=>{
    mongoose.connect(URL).then(()=>{
        console.log("")
        console.log("Database connected successfully!!")
    })
}