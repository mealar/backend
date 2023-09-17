const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.ObjectId,
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    isActive: Boolean,
    createdBy: String,
    lastModifiedBy: String,
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
