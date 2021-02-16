const expect = require("chai").expect;
const request = require("request");
const config = require("config");

describe("Main route",function(){
    const url = config.get("host");
    it("responds to get main request",function(done){
        request(url,function(error,res,body){
            expect(res.statusCode).to.equal(200);
            done();
        })
    })

});