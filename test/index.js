const config = require("config");
const app = require("..");

const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);

const expect = chai.expect;
const request = chai.request;

describe("Main route", function () {
    const url = config.get("host");
    it("responds to get main request", function (done) {
        request(app)
            .get("/")
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});
