const mongoose = require('mongoose');

const SquareParkSchema = new mongoose.Schema({
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
            
        }
    },
    geometry:{
        type:{
            type: String,
            required: true,
            default: "Polygon"
        },
        coordinates:{
            type:[[[Number]]],
            required:true,
            index:"2dsphere"
        }
    }    
}, {
    timestamps: true
});

const SquarePark = mongoose.model('square&parks', SquareParkSchema)

module.exports = SquarePark