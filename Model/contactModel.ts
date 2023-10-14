import mongoose, { Schema } from "mongoose"

interface iContacts extends mongoose.Document{
    firstName : string,
    lastName:string,
    email:string,
    phoneNumber:string,
    avatar:string,
    avatarID:string
    label:string,
    favorite:boolean
}

const contactModel:Schema<iContacts> = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        unique:true,
        maxlength:11,
        minlength:11,
    },
    avatar:{
        type:String
    },
    avatarID:{
        type:String
    },
    label:{
        type:String
    },
    favorite:{
        type:Boolean
    },
},{timestamps:true})

export default mongoose.model<iContacts>("contacts",contactModel)