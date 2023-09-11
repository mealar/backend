const mongoose = require("mongoose");

const additonGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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

const additonGroup = mongoose.model("additonGroup", additonGroupSchema);

module.exports = additonGroup;
