const Trees = require('../models/Trees');

module.exports = {
    getAll: function(req,res){
        Trees.find({}).sort({scientificName:1})
        .then(tree =>{
            if(tree.length!= 0) return res.status(200).send({"Total":tree.length, tree})
            return res.status(204).send({message:"No hay árboles cargados aun"})
        })
        .catch(err => res.status(500).send({err}));
    },
    // doc: function(req,res) {
    //     res.send({message:'Los campos obligatorios son: name => nombre del club; address => Calle; Height => altura; type => Point; coordenates => primero latitud y luego longitud ej: -58.3957713,-34.7233359, solo separados por una coma, sin espacios'})
    // },
    create: function(req,res){
        const data ={ 
            scientificName: req.body.scientificName,
            commonName: req.body.commonName,
            native: req.body.native,
            allegenic: 0,
            samplesImg: ""
        }
        const newTree = new Trees(data)
        newTree.save()
        .then(Trees => res.status(201).send({Trees}))
        .catch(err => res.status(500).send({err}))
    },
    getNativeTrees: function(req, res) {
        Trees.find({ native: true }).sort({ scientificName: 1 })
            .then(nativeTrees => {
                if (nativeTrees.length != 0) {
                    nativeTrees.forEach(tree => {
                        tree.scientificName = tree.scientificName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    });
                    return res.status(200).send(nativeTrees);
                }
                return res.status(204).send({ message: "No hay árboles nativos cargados aún" });
            })
            .catch(err => res.status(500).send({ err }));
    }
}