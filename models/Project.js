const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    owner: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, minLength: 1, maxLength: 15 },
    created: { type: Date, default: Date.now },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
