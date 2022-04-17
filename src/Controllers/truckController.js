const { validationResult } = require("express-validator");
const handleErrors = require("../../Utils/errorHandler");

const truckUtils = require("../../Utils/truckUtils");
const parcelUtils = require("../../Utils/parcelUtils");
const schemaUtils = require("../../Utils/schemaUtils");

module.exports = (db) => {
  //add new truck
  let postTruck = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    try {
      let truck = await db.postTruck(
        req.body.name,
        req.body.baseWeight,
        req.body.parcels
      );
      if (truck) {
        res.status(201).json({ message: "added", data: truck });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  };

  //get all trucks
  let getAllTrucks = async (req, res, next) => {
    try {
      let trucks = await db.getAllTrucks();
      if (trucks) {
        res.status(200).json({ data: trucks });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  };

  //get one truck by id with details
  let getTruck = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    try {
      let truck = await db.getTruckById(req.params.id);
      if (truck) {
        //get truck number of parcesl and total weight
        let time;
        if (req.params.time) time = new Date(parseInt(req.params.time));
        else time = new Date(Date.now());
        let result = truckUtils.getTruckDetails(truck, time);
        res.status(200).json({
          data: {
            _id: truck._id,
            name: truck.name,
            baseWeight: truck.baseWeight,
            numberOfParcels: result.numberOfParcels,
            currentWeight: result.truckWeight,
          },
        });
      } else {
        res.status(404).json({ message: "Truck not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  //update truck
  let putTruck = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    //check if request body contains valid schema fields names
    const isValidOperation = schemaUtils.checkIfValidSchemaFields(req.body, [
      "name",
      "baseWeight",
      "parcels",
    ]);
    //update if valid
    if (isValidOperation) {
      try {
        let truck = await db.putTruckById(req.params.id, req.body);
        if (truck) {
          res.status(201).json({ message: "updated", data: truck });
        } else {
          res.status(404).json({ message: "Truck not found" });
        }
      } catch (error) {
        next(error);
      }
    }
    //reject operation if invalid
    else {
      res.status(400).json({ message: "Enter valid schema fields" });
    }
  };

  //load truck with parcels
  let loadTruck = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    try {
      let truck = await db.loadTruck(req.params.id, req.body.parcels);
      if (truck) {
        let parcels = parcelUtils.mapParcels(truck.parcels);
        res.status(201).json({ message: "loaded", parcels: parcels });
      } else {
        res.status(404).json({ message: "Truck not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  //unload truck and return parcels
  let unloadTruck = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    try {
      let truck = await db.unloadTruck(req.params.id);
      if (truck) {
        if (truck.parcels.length > 0) {
          let parcels = parcelUtils.mapParcels(truck.parcels);
          let newParcels = parcelUtils.reduceParcels(parcels);
          res.status(201).json({ message: "unloaded", parcels: newParcels });
        } else {
          res.status(400).json({ message: "Truck is empty" });
        }
      } else {
        res.status(404).json({ message: "Truck not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  return {
    postTruck: postTruck,
    getAllTrucks: getAllTrucks,
    getTruck: getTruck,
    putTruck: putTruck,
    loadTruck: loadTruck,
    unloadTruck: unloadTruck,
  };
};
