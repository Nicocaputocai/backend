import {Schema, model} from "mongoose";

//El modelo es exactamente igual a js
const ClubSchema = new Schema({
    type:{
        type: String,
        default: "Feature"
    },
    properties: {
        name:{
            type: String,
            required:true
        },
        address:{
            type:String,
            required:true,
        },
        height:{
            type: String,
            required:true
        }
    },
    geometry:{
        type:{
            type: String,
            required: true,
            default: "Point"
        },
        coordinates:{
            type:[Number],
            required:true,
            index:"2dsphere"
        }
    }
}, {
    timestamps: true
});

export const Club = model('Club', ClubSchema)
