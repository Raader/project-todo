const expect = require("chai").expect;
const { saveUser } = require("../models/User");

describe("User database methods", function () {
    describe("saving a user", function () {
        it("should save the user to the database", function (done) {
            const user = {
                name: "faruk",
                email: "faruk@farukmail.com",
                password: "faruk2356",
            };
            saveUser(user, function (err, doc) {
                expect(err).to.not.exist;
                expect(doc).to.exist;
                done();
            });
        });
        it("should not save the user(invalid email format)", function (done) {
            const user = {
                name: "faruk",
                email: "faruk@farukmail",
                password: "faruk2356",
            };
            saveUser(user, function (err, doc) {
                expect(err.errors["email"]).to.exist;
                done();
            });
        });
        it("should not save the user(duplicate user)", function (done) {
            const user = {
                name: "faruk",
                email: "faruk@farukmail.com",
                password: "faruk2356",
            };
            saveUser(user, function (err, doc) {
                expect(err).to.exist;
                done();
            });
        });
    });
});
