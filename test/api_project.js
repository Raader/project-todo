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
        it("should get project by id", function () {
            return request(app)
                .get("/api/project/get/" + project.id)
                .set("Authorization", "Bearer " + token)
                .then((res) => {
                    expect(res).to.have.status(200);
                });
        });
    });
    let todo;
    describe("adding a todo", function () {
        it("should add a todo to the project", function () {
            return request(app)
                .post("/api/todo/add")
                .set("Authorization", "Bearer " + token)
                .send({
                    project,
                    todo: {
                        name: "mahmutu bul ve öldür",
                        description: "mahmutu pıçakla.",
                    },
                })
                .then((res) => {
                    todo = res.body.todo;
                    expect(res).to.have.status(200);
                });
        });
    });
    describe("edit a todo", function () {
        it("should edit the todo", function () {
            todo.name = "mahmut";
            todo.description = "helak";
            todo.stats.importance = 2;
            return request(app)
                .post("/api/todo/edit")
                .set("Authorization", "Bearer " + token)
                .send({
                    project,
                    todo,
                })
                .then((res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                });
        });
    });

    let todos = [];
    describe("getting todos", function () {
        it("should list todos", function () {
            return request(app)
                .post("/api/todo/list")
                .set("Authorization", "Bearer " + token)
                .send({ project })
                .then((res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    todos = res.body.todos;
                });
        });
    });
    describe("completing a todo", function () {
        it("should complete the todo", function () {
            return request(app)
                .post("/api/todo/complete")
                .set("Authorization", "Bearer " + token)
                .send({ todo: todos[0], project })
                .then((res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                });
        });
    });
    describe("deleting a todo", function () {
        it("should delete the todo", function () {
            return request(app)
                .post("/api/todo/remove")
                .set("Authorization", "Bearer " + token)
                .send({
                    project,
                    todo,
                })
                .then((res) => {
                    console.log(res.body);
                    expect(res).to.have.status(200);
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
    describe("fetching a project or projects", function () {});
});
