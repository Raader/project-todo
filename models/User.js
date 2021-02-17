const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 15 },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: function (v) {
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(v);
        },
    },
    password: { type: String, required: true },
    cake: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    model: userModel,
    saveUser: function (user, cb) {
        const doc = new userModel({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        doc.save(cb);
    },
};
