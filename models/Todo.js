const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    owner: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    stats: { difficulty: Number, time: Number, importance: Number },
    created: { type: Date, default: Date.now },
});

const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;
