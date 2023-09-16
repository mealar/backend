const mongoose = require("mongoose");

const additonGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    additionObjects: [{ type: mongoose.ObjectId, ref: "addition" }],
    default: mongoose.ObjectId,
    createdBy: {
      type: String,
      required: true,
    },
    lastModifiedBy: String,
  },
  {
    timestamps: true,
  }
);

const additionGroup = mongoose.model("additionGroup", additonGroupSchema);

module.exports = additionGroup;
