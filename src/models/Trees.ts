import { model } from "mongoose"

const mongoose = require('mongoose')

const TreeSchema = new mongoose.Schema({
    scientificName:{
        type: String,
        required:true
    },
    commonName:{
        type: String,
        required:true
    },
    native:{
        type: Boolean,
        required:true 
    },
    allegenic:{
        type: Boolean,
        required:true 
    },
    samplesImg:{
        type: [String],
        required:true,
        default:""
    },
    description:{
        type:String,
        required: false,
        default: ""
    }
},{
    timestamps:true
})
export const Trees = model('Trees', TreeSchema)