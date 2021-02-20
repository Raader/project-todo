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
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return cb(err);
        this.password = hash;
        cb(null);
    });
};

userSchema.statics.saveUser = function (user, cb) {
    if (!user) return cb(new Error("no user found"));
    const doc = new this({
        name: user.name,
        email: user.email,
        password: user.password,
    });
    doc.hashPassword((err) => {
        if (err) cb(err);
        doc.save()
            .then((doc) => cb(null, doc))
            .catch((err) => cb(err));
    });
};

userSchema.statics.findUserById = function (id, cb) {
    this.findById(id)
        .exec()
        .then((doc) => cb(null, doc))
        .catch((err) => cb(err));
};

userSchema.statics.findUser = function (email, password, cb) {
    this.findOne({ email })
        .exec()
        .then((doc) => {
            if (!doc) throw new Error("user not found");
            bcrypt.compare(password, doc.password, function (err, same) {
                if (err) return console.error(err);
                if (!same) cb(new Error("passwords are not matching"));
                cb(null, doc);
            });
        })
        .catch((err) => cb(err));
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;