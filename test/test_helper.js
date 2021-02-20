const config = require("config");
const mongoose = require("mongoose");
const userModel = require("../models/User");

mongoose.Promise = global.Promise;

before(function (done) {
    this.timeout(0);
    //mongoose.connect(config.get("dbURI"));
    userModel.deleteMany({}, function (err) {
        if (err) console.error(err);
        done();
    });
});
