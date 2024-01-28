import mongoose, {Schema, model} from "mongoose";

//El modelo es exactamente igual a js
const CensusTreeSchema = new Schema({
    type:{
        type: String,
        default: "Feature"
    },
    properties: {
        idTree:{
            type: mongoose.Schema.Types.ObjectId,
            ref: REF.TREES,
            required:true
        },
        location:{
            type: String,
            required:true
        },
        address:{
            type:String,
            required:true,
        },
        neightboardhood:{
            type: String,
            required:true
        },
        leafImg:{
            type: String,
            required:true
        },
        profileImg:{
            type: String,
            required:true
        },
        status:{
            type: Number,
            required:true
        },
        fallingDanger:{
            type: Boolean,
            required:true
        },
        true:{
            type: Boolean,
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

export const CensusTree = model('CensusTree', CensusTreeSchema)
