process.env.NODE_ENV = "dev";
const config = require("config");
console.log(config.get("dbURI"));
const mongoose = require("mongoose");

const app = require("../index");

mongoose.Promise = global.Promise;

before(function (done) {
    this.timeout(0);
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});
