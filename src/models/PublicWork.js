const mongoose = require('mongoose');

const PublicWokrSchema = new mongoose.Schema({
    type:{
        type: String,
        default: "Feature"
    },
    properties: {
        name:{
            type: String,
            required:true
        },
        description:{
            type:String,
            required:true,
            
        },
        status:{
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

const PublicWork = mongoose.model('PublicWork', PublicWokrSchema)

module.exports = PublicWork