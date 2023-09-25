const mongoose = require("mongoose");

const additonGroupSchema = new mongoose.Schema(
  {
    dishId: mongoose.ObjectId,
    menuId: mongoose.ObjectId,
    name: {
      type: String,
      required: true,
    },
    additionObjects: [{ type: mongoose.ObjectId, ref: "addition" }],
    default: { type: mongoose.ObjectId, ref: "addition" },
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

const additionGroup = mongoose.model("additionGroup", additonGroupSchema);

module.exports = additionGroup;
