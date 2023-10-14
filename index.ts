import express, { Application } from "express"
import env from "dotenv"
import { dbConfig } from "./Utils/DB"
import { appConfig } from "./app"

env.config()

const port:string = process.env.PORT!

const app:Application = express()

appConfig(app)
const server = app.listen(port,()=>{
    console.log("")
    console.log("A server is running on port: ",port)
    dbConfig()
}) 

process.on("uncaughtException",(error:Error)=>{
    console.log("A server is shutting down due to uncaughtException:",error)
    process.exit(1)
})

process.on("unhandledRejection",(reason:any)=>{
    console.log("A server is shutting down due to unhandledRejection:",reason)
    server.close(()=>{
        process.exit(1)
    })
})

