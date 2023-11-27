const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    table_name: {
      type: String,
      required: true,
    },
    table_location: {
      type: String,
      required: true,
    },
    table_note: {
      type: String,
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
