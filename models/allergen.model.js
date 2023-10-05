const mongoose = require("mongoose");

const allergenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
});

module.exports = allergenSchema;
