const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

module.exports = tableSchema;
