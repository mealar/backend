const mongoose = require("mongoose");
const additionSchema = require("./addition.model");

const additionGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    additionObjects: [additionSchema],
    default: additionSchema,
    createdBy: {
      type: String,
      required: true,
    },
    isRequired: { type: Boolean, default: false },
    lastModifiedBy: String,
  },
  {
    timestamps: true,
  }
);

module.exports = additionGroupSchema;
