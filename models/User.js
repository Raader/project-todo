const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 15 },
    email: {
        type: String,
        lowercase: true,
        required: [true, "no email adress"],
        unique: true,
        validate: {
            validator: function (v) {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return re.test(v);
            },
            message: "invalid email adress",
        },
    },
    password: { type: String, required: true },
    cake: { type: Date, default: Date.now },
});

userSchema.methods.hashPassword = function () {
    return bcrypt
        .hash(this.password, 10)
        .then((hash) => (this.password = hash));
};

userSchema.statics.saveUser = async function (user) {
    if (!user) throw new Error("no user found");
    const doc = new this({
        name: user.name,
        email: user.email,
        password: user.password,
    });
    const hash = await doc.hashPassword();
    return doc.save();
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
