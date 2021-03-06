const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const controllerFunc = require("../Controllers/parcelController");

module.exports = (db) => {
  const controller = controllerFunc(db);

  router
    //post parcel
    .post(
      "",
      [
        body("name").exists().withMessage("parcel name is required"),
        body("weight").exists().withMessage("parcel weight is required"),
        body("weight").isNumeric().withMessage("parcel weight must be numeric"),
      ],
      controller.postParcel
    )
    //get all parcels
    .get("", controller.getAllParcels)
    //get one parcel by id
    .get(
      "/:id",
      [
        param("id").exists().withMessage("parcel id is required"),
        param("id").isAlphanumeric().withMessage("enter valid parcel id"),
      ],
      controller.getParcel
    );

  return router;
};
