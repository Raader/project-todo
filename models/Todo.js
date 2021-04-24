const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    owner: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, minLength: 1, maxLength: 140 },
    description: { type: String, minLength: 0, maxLength: 300 },
    completed: { type: Boolean, default: false },
    stats: {
        difficulty: { type: Number, default: 0 },
        time: { type: Number, default: 0 },
        importance: { type: Number, default: 0 },
    },
    created: { type: Date, default: Date.now },
    completed_date: Date,
});

const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;
