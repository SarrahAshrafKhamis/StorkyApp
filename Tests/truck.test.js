const supertest = require("supertest");
const server = require("../Utils/server");
const { connect, disconnect } = require("../Utils/database");

beforeAll(async () => {
  await connect();
});

//testing truck routes
describe("truck routes", () => {
  //post truck
  describe("post truck", () => {
    //happy path
    describe("given name and baseWeight", () => {
      //check status code
      test("should respond with 201", async () => {
        const res = await supertest(server).post("/trucks").send({
          name: "truck101",
          baseWeight: 100,
        });
        expect(res.statusCode).toBe(201);
      });

      //check id is retrieved
      test("response should contain truck id", async () => {
        const res = await supertest(server).post("/trucks").send({
          name: "truck101",
          baseWeight: 100,
        });
        expect(res.body.data._id).toBeDefined();
      });

      //check name is retrieved
      test("response should contain truck name", async () => {
        const res = await supertest(server).post("/trucks").send({
          name: "truck101",
          baseWeight: 100,
        });
        expect(res.body.data.name).toBeDefined();
      });

      //check weight is retrieved
      test("response should contain truck baseWeight", async () => {
        const res = await supertest(server).post("/trucks").send({
          name: "truck101",
          baseWeight: 100,
        });
        expect(res.body.data.baseWeight).toBeDefined();
      });
    });

    //missing required field
    describe("given just name", () => {
      test("should respond with 500", async () => {
        const res = await supertest(server).post("/trucks").send({
          name: "truck101",
        });
        expect(res.statusCode).toBe(422);
      });
    });

    //missing required field
    describe("given just baseWeight", () => {
      test("should respond with 500", async () => {
        const res = await supertest(server).post("/trucks").send({
          baseWeight: 100,
        });
        expect(res.statusCode).toBe(422);
      });
    });

    //missing all required fields
    describe("given empty object", () => {
      test("should respond with 500", async () => {
        const res = await supertest(server).post("/trucks").send({});
        expect(res.statusCode).toBe(422);
      });
    });
  });

  //get truck
  describe("get truck", () => {
    //happy path
    describe("given truck does exist", () => {
      //check status code
      test("should respond with 200", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f55"
        );
        expect(res.statusCode).toBe(200);
      });

      //check id is retrieved
      test("response should contain truck id", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f55"
        );
        expect(res.body.data._id).toBeDefined();
      });

      //check name is retrieved
      test("response should contain truck name", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f55"
        );
        expect(res.body.data.name).toBeDefined();
      });

      //check weight is retrieved
      test("response should contain truck baseWeight", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f55"
        );
        expect(res.body.data.baseWeight).toBeDefined();
      });

      //check numberOfParcels is retrieved
      test("response should contain truck numberOfParcels", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f55"
        );
        expect(res.body.data.numberOfParcels).toBeDefined();
      });

      //check currentWeight is retrieved
      test("response should contain truck currentWeight", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f55"
        );
        expect(res.body.data.currentWeight).toBeDefined();
      });
    });

    //invalid truck id
    describe("given truck does not exist", () => {
      //check status code
      test("should respond with 404", async () => {
        const res = await supertest(server).get(
          "/trucks/625a7b86a4df5600c8283f56"
        );
        expect(res.statusCode).toBe(404);
      });
    });
  });

  //get all trucks
  describe("get all trucks", () => {
    //check status code
    test("should respond with 200", async () => {
      const res = await supertest(server).get("/trucks");
      expect(res.statusCode).toBe(200);
    });
  });

  //load truck
  describe("load truck", () => {
    //happy path
    describe("given truck does exist", () => {
      //check status code
      test("should respond with 201", async () => {
        const res = await supertest(server)
          .put("/trucks/load/625a7b86a4df5600c8283f55")
          .send({
            parcels: [
              {
                parcel: "6252dc6d93a6390b9d926792",
                quantity: 50,
              },
              {
                parcel: "625a84d80ade7f9a9a0042b8",
                quantity: 30,
              },
            ],
          });
        expect(res.statusCode).toBe(201);
      });

      //check truck is loaded
      test("new parcels pushed to the array", async () => {
        const adding = [
          {
            parcel: "6252dc6d93a6390b9d926792",
            quantity: 100,
          },
          {
            parcel: "625a84d80ade7f9a9a0042b8",
            quantity: 60,
          },
        ];
        const res = await supertest(server)
          .put("/trucks/load/625a7b86a4df5600c8283f55")
          .send({
            parcels: adding,
          });
        expect(
          adding.every((v) =>
            res.body.parcels.some(
              (p) => p._id == v.parcel && p.quantity == v.quantity
            )
          )
        ).toBe(true);
      });
    });

    //invalid truck id
    describe("given truck does not exist", () => {
      //check status code
      test("should respond with 404", async () => {
        const res = await supertest(server)
          .put("/trucks/load/625a7b86a4df5600c8283f56")
          .send({
            parcels: [
              {
                parcel: "6252dc6d93a6390b9d926792",
                quantity: 50,
              },
              {
                parcel: "625a84d80ade7f9a9a0042b8",
                quantity: 30,
              },
            ],
          });
        expect(res.statusCode).toBe(404);
      });
    });
  });

  //unload truck
  describe("unload truck", () => {
    //happy path
    describe("given truck does exist", () => {
      //check status code
      test("should respond with 201", async () => {
        const res = await supertest(server).put(
          "/trucks/unload/625a7b86a4df5600c8283f55"
        );
        expect(res.statusCode).toBe(201);
      });

      //check
    });
  });
});

afterAll(async () => {
  await disconnect();
});
