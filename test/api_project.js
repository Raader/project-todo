const config = require("config");
const app = require("..");

const chai = require("chai");
const chaihttp = require("chai-http");
const { expect } = require("chai");
chai.use(chaihttp);

const should = chai.should();
const request = chai.request;

describe("Project Api", function () {
    describe("creating a project", function () {
        it("should create a project", function () {
            const user = {
                name: "faruk10",
                email: "faruk10@farukmail.com",
                password: "faruk2356",
            };
            return request(app)
                .post("/api/user/register")
                .send({ user })
                .then((res) => {
                    return request(app)
                        .post("/api/project/create")
                        .set("Authorization", "Bearer " + res.body.token)
                        .send({ project: { name: "farukun projesi" } });
                })
                .then((res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                });
        });
    });
    describe("deleting a project", function () {});
    describe("adding a todo", function () {});
    describe("deleting a todo", function () {});
    describe("completing a todo", function () {});
    describe("fetching a project or projects", function () {});
});
