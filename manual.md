### Modelos:
#### TreesList:
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

#### CensusTree:
const ClubSchema = new mongoose.Schema({
    type:{
        type: String,
        default: "Feature"
    },
    properties: {
        idTree:{
            type: String,
            required:true
    },
        location:{
            type: String,
            required:true
    },
        addres:{
            type: String,
            required:true 
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
            required: true
    },
        fallingDanger:{
            type: Boolean,
            required: true
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

#### User
email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: [ROLES.ADMIN, ROLES.USER],
        default: ROLES.USER
    },
    censusTrees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: REF.CENSUSTREES
        }
    ]

### Controllers
#### CensusTrees
 getAll: function(req,res){
        CensusTrees.find({})
        .then(censusTree =>{
            if(censusTree.length!= 0) return res.status(200).send({"type": "FeatureCollection","features":censusTree})
            return res.status(204).send({message:"No hay árboles cargados aun"})
        })
        .catch(err => res.status(500).send({err}));
    },
    create: function(req,res){
        let values = req.body.coordinates.split(",")
        let v1 = parseFloat(values[0])
        let v2 = parseFloat(values[1])
        let coordinates = [v1,v2]
        const data ={ 
            properties:{
                idTree:req.body.idTree,
                location:req.body.location,
                addres:req.body.addres,
                neightboardhood:req.body.neightboardhood,
                leafImg:req.body.leafImg,
                profileImg:req.body.profileImg,
                status:req.body.status,
                fallingDanger:req.body.fallingDanger,

            },
            geometry:{
                type: "Point",
                coordinates: coordinates
            }
        }
        const newCensusTree = new censusTree(data)
        newCensusTree.save()
        .then(censusTree => res.status(201).send({censusTree}))
        .catch(err => res.status(500).send({err}))
    },

#### TreeList

get all,
create,
getOne