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
    }
},{
    timestamps:true
})

const Trees = mongoose.model('Tree', TreeSchema);

module.exports = Trees