/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../../server/server.js");

const request = supertest(app);

it("Test for non existent endpoints", (done) => {
  request
    .get("/nope")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404, done);
});

it("Test GET /api/test endpoint", (done) => {
  request
    .get("/api/test")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});
