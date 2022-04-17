// require("dotenv").config();
const supertest = require("supertest");
const server = require("../Utils/server");
const { connect, disconnect } = require("../Utils/database");

beforeAll(async () => {
  await connect();
});

//testing parcel routes
describe("parcel routes", () => {
  //post parcel
  describe("post parcel", () => {
    //happy path
    describe("given name and weight", () => {
      //check status code
      test("should respond with 201", async () => {
        const res = await supertest(server).post("/parcels").send({
          name: "parcel101",
          weight: 5,
        });
        expect(res.statusCode).toBe(201);
      });

      //check id is retrieved
      test("response should contain parcel id", async () => {
        const res = await supertest(server).post("/parcels").send({
          name: "parcel101",
          weight: 5,
        });
        expect(res.body.data._id).toBeDefined();
      });

      //check name is retrieved
      test("response should contain parcel name", async () => {
        const res = await supertest(server).post("/parcels").send({
          name: "parcel101",
          weight: 5,
        });
        expect(res.body.data.name).toBeDefined();
      });

      //check weight is retrieved
      test("response should contain parcel weight", async () => {
        const res = await supertest(server).post("/parcels").send({
          name: "parcel101",
          weight: 5,
        });
        expect(res.body.data.weight).toBeDefined();
      });
    });

    //missing required field
    describe("given just name", () => {
      test("should respond with 500", async () => {
        const res = await supertest(server).post("/parcels").send({
          name: "parcel101",
        });
        expect(res.statusCode).toBe(422);
      });
    });

    //missing required field
    describe("given just weight", () => {
      test("should respond with 500", async () => {
        const res = await supertest(server).post("/parcels").send({
          weight: 5,
        });
        expect(res.statusCode).toBe(422);
      });
    });

    //missing all required fields
    describe("given empty object", () => {
      test("should respond with 500", async () => {
        const res = await supertest(server).post("/parcels").send({});
        expect(res.statusCode).toBe(422);
      });
    });
  });

  //get parcel
  describe("get parcel", () => {
    //happy path
    describe("given parcel does exist", () => {
      //check status code
      test("should respond with 200", async () => {
        const res = await supertest(server).get(
          "/parcels/6252dc6d93a6390b9d926792"
        );
        expect(res.statusCode).toBe(200);
      });

      //check id is retrieved
      test("response should contain parcel id", async () => {
        const res = await supertest(server).get(
          "/parcels/6252dc6d93a6390b9d926792"
        );
        expect(res.body.data._id).toBeDefined();
      });

      //check name is retrieved
      test("response should contain parcel name", async () => {
        const res = await supertest(server).get(
          "/parcels/6252dc6d93a6390b9d926792"
        );
        expect(res.body.data.name).toBeDefined();
      });

      //check weight is retrieved
      test("response should contain parcel weight", async () => {
        const res = await supertest(server).get(
          "/parcels/6252dc6d93a6390b9d926792"
        );
        expect(res.body.data.weight).toBeDefined();
      });
    });

    //invalid parcel id
    describe("given parcel does not exist", () => {
      //check status code
      test("should respond with 404", async () => {
        const res = await supertest(server).get(
          "/parcels/6252dc6d93a6390b9d926793"
        );
        expect(res.statusCode).toBe(404);
      });
    });
  });

  //get all parcels
  describe("get all parcels", () => {
    //check status code
    test("should respond with 200", async () => {
      const res = await supertest(server).get("/parcels");
      expect(res.statusCode).toBe(200);
    });
  });
});

afterAll(async () => {
  await disconnect();
});
