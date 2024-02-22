const CensusTree = require('../models/CensusTree');

module.exports ={
    getAll: function(req,res){
        CensusTree.find({})
        .then(tree =>{
            if(tree.length!= 0) return res.status(200).send({"type": "FeatureCollection","features":tree})
            return res.status(204).send({message:"No hay arboles censados aun"})
        });
    },
    create: function(req,res){
        let values = req.body.coordinates.split(",");
        let v1 = parseFloat(values[0]);
        let v2 = parseFloat(values[1]);
        let coordinates = [v1, v2];
        
        const data ={
            properties:{
                // idTree:req.body.idTree,
                tree: req.body.tree,
                address: req.body.address,
                neightboardhood: req.body.neightboardhood,
                leafImg: (req.files[0])?req.files[0].filename: "",
                profileImg: (req.files[0])?req.files[0].filename: "",
                generalStatus: req.body.generalStatus,
                fallingDanger: req.body.fallingDanger,
                inclination: req.body.inclination,
                diameter: req.body.diameter
            },
            geometry:{
                type: "Point",
                coordinates: coordinates
            }
        };
        const newTree = new CensusTree(data);
        newTree.save()
        .then(CensusTree => res.status(201).send({CensusTree}))
        .catch(err => res.status(500).send({err}))
    }
};