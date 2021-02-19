const config = require("config");
const app = require("..");

const chai = require("chai");
const chaihttp = require("chai-http");
const { expect } = require("chai");
chai.use(chaihttp);

const should = chai.should();
const request = chai.request;

describe("Users api", function () {
    describe("signing up a user", function () {
        it("should sign up the user", function (done) {
            const user = {
                name: "faruk",
                email: "faruk2@farukmail.com",
                password: "faruk2356",
            };
            request(app)
                .post("/api/user/register")
                .send({ user })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.not.have.property("err");
                    res.body.should.have.property("msg");
                    res.body.should.have.property("user");
                    res.body.should.have.property("token");
                    done();
                });
        });
    });
    describe("signing in a user", function () {
        it("should sing in the user", function (done) {
            const user = {
                email: "faruk2@farukmail.com",
                password: "faruk2356",
            };
            request(app)
                .post("/api/user/login")
                .send({ user })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.not.have.property("err");
                    res.body.should.have.property("msg");
                    res.body.should.have.property("token");
                    done();
                });
        });
    });
    describe("getting user with token", function () {
        it("should get the user", function (done) {
            const user = {
                email: "faruk2@farukmail.com",
                password: "faruk2356",
            };
            request(app)
                .post("/api/user/login")
                .send({ user })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.not.have.property("err");
                    res.body.should.have.property("msg");
                    res.body.should.have.property("token");
                    request(app)
                        .get("/api/users/")
                        .set("Authorization", "Bearer " + res.body.token)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.not.have.property("err");
                            res.body.should.have.property("msg");
                            res.body.should.have.property("user");
                            done();
                        });
                });
        });
    });
});
