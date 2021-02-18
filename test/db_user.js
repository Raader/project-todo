const expect = require("chai").expect;
const model = require("../models/User");

describe("User database methods", function () {
    before(function (done) {
        this.timeout(0);
        model.init(function (err) {
            if (err) console.error(err);
            done();
        });
    });
    after(function (done) {
        this.timeout(0);
        model.remove({}, function (err) {
            if (err) console.error(err);
            done();
        });
    });
    describe("saving a user", function () {
        it("should save the user to the database", function (done) {
            const user = {
                name: "faruk",
                email: "faruk@farukmail.com",
                password: "faruk2356",
            };
            model.saveUser(user, function (err, doc) {
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
            model.saveUser(user, function (err, doc) {
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
            model.saveUser(user, function (err, doc) {
                expect(err).to.exist;
                expect(doc).to.not.exist;
                done();
            });
        });
    });

    describe("finding a user", function () {
        it("should find user by id", function (done) {
            const user = {
                name: "faruk2",
                email: "faruk2@farukmail.com",
                password: "faruk2356",
            };
            model.saveUser(user, function (err, doc) {
                expect(err).to.not.exist;
                expect(doc).to.exist;
                expect(doc).to.have.property("id");
                model.findUserById(doc.id, function (err, d) {
                    expect(err).to.not.exist;
                    expect(d).to.exist;
                    done();
                });
            });
        });
    });
});
