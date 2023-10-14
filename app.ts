import express, { Application, Request, Response }  from "express"
import cors from "cors"
import contacts from "./Router/contactRouter"

export const appConfig =  (app:Application)=>{
app.use(express.json())
app.use(cors())

app.use("/api",contacts)


app.get("/",(req:Request,res:Response)=>{
    try {
        res.status(200).json({
            message:"Everything is working🚀🚀👏👏👏"
        })
    } catch (error) {
        res.status(404).json({
            message:"Everything is not okay 🤕🤕😵‍💫"
        })
    }
})
}