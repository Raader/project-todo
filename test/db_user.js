const expect = require("chai").expect;
const model = require("../models/User");

describe("User database methods", function () {
    before(function (done) {
        this.timeout(0);
        model.deleteMany({}, function (err) {
            if (err) console.error(err);
            model.init(function (err) {
                if (err) console.error(err);
                done();
            });
        });
    });
    const testUser = {
        name: "faruk6",
        email: "faruk6@farukmail.com",
        password: "faruk2356",
    };
    let sampleUser;
    beforeEach(function (done) {
        this.timeout(0);
        model.deleteMany({}, function (err) {
            if (err) console.error(err);
            model.saveUser(testUser, function (err, doc) {
                if (err) console.error(err);
                sampleUser = doc;
                done();
            });
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
                try {
                    expect(err).to.not.exist;
                    expect(doc).to.exist;
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        it("should not save the user(invalid email format)", function (done) {
            const user = {
                name: "faruk",
                email: "faruk@farukmail",
                password: "faruk2356",
            };
            model.saveUser(user, function (err, doc) {
                try {
                    expect(err.errors["email"]).to.exist;
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        it("should not save the user(duplicate user)", function (done) {
            model.saveUser(testUser, function (err, doc) {
                try {
                    expect(err).to.exist;
                    expect(doc).to.not.exist;
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });
    describe("finding a user", function () {
        it("should find user by id", function (done) {
            model.findUserById(sampleUser.id, function (err, d) {
                try {
                    expect(err).to.not.exist;
                    expect(d).to.exist;
                    done();
                } catch {
                    done(err);
                }
            });
        });
        it("should find user by email & password", function (done) {
            model.findUser(
                testUser.email,
                testUser.password,
                function (err, d) {
                    try {
                        expect(err).to.not.exist;
                        expect(d).to.exist;
                        done();
                    } catch (e) {
                        done(e);
                    }
                }
            );
        });
    });
});
