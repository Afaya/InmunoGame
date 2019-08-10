var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://raspberrypi:8080");

describe("Login Test", function () {
    it("should return 401", function (done) {
        server
            .post("/login")
            .send({ user: 'test', password: 'passTest' })
            .expect("Content-type", /json/)
            .expect(401) // THis is HTTP response
            .end(function (err, res) {
                res.status.should.equal(401);
                res.body.error.should.equal(true);
                done();
            });
    });

    it("should return 200", function (done) {
        server
            .post("/login")
            .send({ user: 'myuser', password: 'mypass' })
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                done();
            });
    });
});

describe("DHT Test", function () {
    it("should return 200", function (done) {
        server
            .get("/dht")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                done();
            });
    });
});

describe("SDS011 Test", function () {
    it("should return 200", function (done) {
        server
            .get("/sds011")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                done();
            });
    });
});