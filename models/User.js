const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.methods.hashPassword = function (cb) {
    if (!cb) return bcrypt.hash(this.password, 10);
    bcrypt.hash(this.password, 10, cb);
};

userSchema.statics.saveUser = function (user, cb) {
    const doc = new this({
        name: user.name,
        email: user.email,
        password: user.password,
    });
    doc.hashPassword()
        .then(() => doc.save())
        .then((doc) => cb(null, doc))
        .catch((err) => cb(err));
};

userSchema.statics.findUserById = function (id, cb) {
    this.findById(id)
        .exec()
        .then((doc) => cb(null, doc))
        .catch((err) => cb(err));
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
