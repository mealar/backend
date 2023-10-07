const mongoose = require("mongoose");
const additionGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    additionObjects: [
      {
        type: mongoose.ObjectId,
        ref: "addition",
      },
    ],
    default: {
      type: mongoose.ObjectId,
      ref: "addition",
    },
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

const AdditionGroup = mongoose.model("additionGroup", additionGroupSchema);
module.exports = AdditionGroup;
