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
        const sampleUser = {
            name: "faruk",
            email: "faruk2@farukmail.com",
            password: "faruk2356",
        };
        it("should sign up the user", function (done) {
            request(app)
                .post("/api/user/register")
                .send({ user: sampleUser })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.not.have.property("err");
                    res.body.should.have.property("msg");
                    res.body.should.have.property("user");
                    res.body.should.have.property("token");
                    done();
                });
        });
        it("should not sign up the user(duplicate)", function (done) {
            request(app)
                .post("/api/user/register")
                .send({ user: sampleUser })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.have.property("err");
                    done();
                });
        });
        it("should not sign up the user(invalid email)", function (done) {
            const user = {
                name: "faruk3",
                email: "faruk3@farukmail",
                password: "faruk2356",
            };
            request(app)
                .post("/api/user/register")
                .send({ user })
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.have.property("err");
                    done();
                });
        });
    });
    describe("logging in a user", function () {
        it("should log in the user", function (done) {
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
                        .get("/api/user")
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
