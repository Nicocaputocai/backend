const SquarePark = require('../models/Square&park');

module.exports = {
    getAll: function(req,res){
        let all = SquarePark.find({})
        all.select('type properties geometry -_id')

        .then(SquarePark =>{
            if(SquarePark.length!= 0) return res.status(200).send({"type": "FeatureCollection","features": SquarePark})
            return res.status(204).send({message:"No hay plazas y parques cargados aun"})
        })
        .catch(err => res.status(500).send({err}));
    }
}