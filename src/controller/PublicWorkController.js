const PublicWork = require('../models/PublicWork');

module.exports = {
    getAll: function(req,res){
        PublicWork.find({})
        .then(publicWork =>{
            if(publicWork.length!= 0) return res.status(200).send({"type": "FeatureCollection","features": publicWork})
            return res.status(204).send({message:"No hay obras públicas cargadas aún"})
        })
        .catch(err => res.status(500).send({err}));
    },
    doc: function(req,res) {
        res.send({message:'Los campos obligatorios son: name => nombre de la institución; address => Calle; altura; type => Point; coordenates => primero longitud y luego latitud ej: -58.3957713,-34.7233359, solo separados por una coma, sin espacios'})
    },
    create: function(req,res){
        let values = req.body.coordinates.split(",")
        let v1 = parseFloat(values[0])
        let v2 = parseFloat(values[1])
        let coordinates = [v1,v2]
        const data ={ 
            properties:{
                name:req.body.name,
                description:req.body.description,
                status:req.body.status
            },
            geometry:{
                type: "Point",
                coordinates: coordinates
            }
        }
        const newMPublicWork = new PublicWork(data)
        newMPublicWork.save()
        .then(PublicWork => res.status(201).send({PublicWork}))
        .catch(err => res.status(500).send({err}))
    }
}