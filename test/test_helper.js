const config = require("config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(function (done) {
    this.timeout(0);
    //mongoose.connect(config.get("dbURI"));
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});
