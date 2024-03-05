const mongoose = require("mongoose");
const { REF } = require("../types/types");
const CensusTreeSchema = new mongoose.mongoose.Schema(
  {
    type: {
      type: String,
      default: "Feature",
    },
    properties: {
      // idTree: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: REF.TREE,
      //   required: true,
      // },
    tree:{
        type: String,
        required: true,
    },
      address: {
        type: String,
        required: true,
      },
      neightboardhood: {
        type: String,
        required: true,
      },
      leafImg: {
        type: String,
        required: true,
      },
      profileImg: {
        type: String,
        required: true,
      },
      generalStatus: {
        type: Number,
        required: true,
      },
      fallingDanger: {
        type: Boolean,
        required: true,
      },
      inclination: {
        type: String,
        required: true,
      },
      diameter: {
        type: String,
        required: true,
      },
    },
    geometry: {
      type: {
        type: String,
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
  },
  {
    timestamps: true,
  }
);

const CensusTree = mongoose.model("CensusTree", CensusTreeSchema);

module.exports = CensusTree;
