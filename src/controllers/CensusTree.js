const CensusTree = require("../models/CensusTree");

module.exports = {
  getAll: function (req, res) {
    CensusTree.find({}).then((tree) => {
      if (tree.length != 0)
        return res
          .status(200)
          .send({ type: "FeatureCollection", features: tree });
      return res.status(204).send({ message: "No hay arboles censados aun" });
    });
  },
  create: function (req, res) {
    let values = req.body.coordinates.split(",");
    let v1 = parseFloat(values[0]);
    let v2 = parseFloat(values[1]);
    let coordinates = [v1, v2];
    console.log(req.files);
    const data = {
      properties: {
        tree: req.body.tree,
        address: req.body.address,
        neightboardhood: req.body.neightboardhood,
        leafImg: req.files.leafImg ? req.files.leafImg[0].filename : "", // Cambiado
        profileImg: req.files.profileImg? req.files.profileImg[0].filename: "", // Cambiado
        damagedTrunk: req.body.damagedTrunk,
        fallingDanger: req.body.fallingDanger,
        inclination: req.body.inclination,
        diameter: req.body.diameter,
        height: req.body.height,
        brokenSidewalk: req.body.brokenSidewalk,
        electricityCable: req.body.electricityCable,
        sidewalk: req.body.sidewalk,
        sidewalkWidth: req.body.sidewalkWidth,
        sprouts: req.body.sprouts,
        cracks: req.body.cracks,
      },
      geometry: {
        type: "Point",
        coordinates: coordinates,
      },
    };
    const newTree = new CensusTree(data);
    console.log(req.body);
    newTree
      .save()
      .then((CensusTree) => res.status(201).send({ CensusTree }))
      .catch((err) => {
        console.error(err); // Ver el error completo en la consola
        res
          .status(500)
          .send({ error: "Error al guardar el árbol.", details: err });
      });
  },
  getUniqueTrees: function (req, res) {
    CensusTree.distinct("properties.tree")
      .then((uniqueTrees) => {
        if (uniqueTrees.length != 0) {
          const formattedTrees = uniqueTrees.map((tree) =>
            tree.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          );
          return res.status(200).send(formattedTrees);
        }
        return res
          .status(204)
          .send({ message: "No hay árboles únicos censados aún" });
      })
      .catch((err) => res.status(500).send({ err }));
  },
};
