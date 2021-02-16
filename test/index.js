const expect = require("chai").expect;
const request = require("request");

describe("Main route",function(){
    const url = "http://localhost:5000"
    it("responds to get main request",function(done){
        request(url,function(error,res,body){
            expect(res.statusCode).to.equal(200);
            done();
        })
    })

});