const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const controller = require("../Controllers/truckController");

router
  //add new truck
  .post(
    "",
    [
      body("name").exists().withMessage("truck name is required"),
      body("baseWeight").exists().withMessage("truck weight is required"),
      body("baseWeight")
        .isNumeric()
        .withMessage("truck weight must be numeric"),
    ],
    controller.postTruck
  )
  //get all trucks
  .get("", controller.getAllTrucks)
  //get one truck by id with details
  .get(
    "/:id",
    [
      param("id").exists().withMessage("truck id is required"),
      param("id").isAlphanumeric().withMessage("enter valid truck id"),
    ],
    controller.getTruck
  )
  //update truck
  .put(
    "/:id",
    [
      param("id").exists().withMessage("truck id is required"),
      param("id").isAlphanumeric().withMessage("enter valid truck id"),
    ],
    controller.putTruck
  )
  //load truck with parcels
  .put(
    "/load/:id",
    [
      param("id").exists().withMessage("truck id is required"),
      param("id").isAlphanumeric().withMessage("enter valid truck id"),
    ],
    controller.loadTruck
  )
  //unload truck and return parcels
  .put(
    "/unload/:id",
    [
      param("id").exists().withMessage("truck id is required"),
      param("id").isAlphanumeric().withMessage("enter valid truck id"),
    ],
    controller.unloadTruck
  );

module.exports = router;
