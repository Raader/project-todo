const config = require("config");
const app = require("..");

const chai = require("chai");
const chaihttp = require("chai-http");
const { expect } = require("chai");
chai.use(chaihttp);

const should = chai.should();
const request = chai.request;

describe("Project Api", function () {
    let token;
    before(function () {
        const user = {
            name: "faruk10",
            email: "faruk10@farukmail.com",
            password: "faruk2356",
        };
        return request(app)
            .post("/api/user/register")
            .send({ user })
            .then((res) => (token = res.body.token));
    });
    let project;
    describe("creating a project", function () {
        it("should create a project", function () {
            return request(app)
                .post("/api/project/create")
                .set("Authorization", "Bearer " + token)
                .send({ project: { name: "farukun projesi" } })
                .then((res) => {
                    project = res.body.project;
                    expect(res).to.have.status(200);
                });
        });
    });
    describe("fetching a project or projects", function () {
        it("should get project names and ids", function () {
            return request(app)
                .get("/api/project/list")
                .set("Authorization", "Bearer " + token)
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("projects");
                });
        });
    });
    describe("deleting a project", function () {
        it("should delete a project", function () {
            return request(app)
                .get("/api/project/remove/" + project.id)
                .set("Authorization", "Bearer " + token)
                .then((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });
    describe("adding a todo", function () {});
    describe("deleting a todo", function () {});
    describe("completing a todo", function () {});
    describe("fetching a project or projects", function () {});
});
