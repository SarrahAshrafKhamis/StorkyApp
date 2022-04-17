const { validationResult } = require("express-validator");
const {
  getTruckDetails,
  reduceParcels,
  checkIfValidSchemaFields,
} = require("../../Utils/TruckUtils");

const Truck = require("../Models/truckSchema");

//add new truck
exports.postTruck = (req, res, next) => {
  //validation errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }

  new Truck({
    name: req.body.name,
    baseWeight: req.body.baseWeight,
    parcels: req.body.parcels,
  })
    .save()
    .then((data) => {
      res.status(201).json({ message: "added", data: data });
    })
    .catch((error) => {
      next(error);
    });
};

//get all trucks
exports.getAllTrucks = (req, res, next) => {
  Truck.find({})
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((error) => {
      next(error);
    });
};

//get one truck by id with details
exports.getTruck = (req, res, next) => {
  //validation errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }

  Truck.findById(req.params.id)
    .populate("parcels.parcel")
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Truck not found" });
      } else {
        //get truck number of parcesl and total weight
        let result = getTruckDetails(data);
        res.status(200).json({
          data: {
            _id: data._id,
            name: data.name,
            baseWeight: data.baseWeight,
            numberOfParcels: result.numberOfParcels,
            currentWeight: result.truckWeight,
          },
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

//update truck
exports.putTruck = (req, res, next) => {
  //validation errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }
  //check if request body contains valid schema fields names
  const isValidOperation = checkIfValidSchemaFields(req.body, [
    "name",
    "baseWeight",
    "parcels",
  ]);
  //update if valid
  if (isValidOperation) {
    Truck.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    )
      .then((data) => {
        if (data) {
          res.status(201).json({ message: "updated", data: data });
        } else {
          res.status(404).json({ message: "Truck not found" });
        }
      })
      .catch((error) => {
        next(error);
      });
  }
  //reject operation if invalid
  else {
    res.status(400).json({ message: "Enter valid schema fields" });
  }
};

//load truck with parcels
exports.loadTruck = (req, res, next) => {
  //validation errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }

  Truck.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        parcels: {
          $each: req.body.parcels,
        },
      },
    },
    { new: true }
  )
    .populate("parcels.parcel")
    .then((data) => {
      if (data) {
        let parcels = data.parcels.map((v) => ({
          _id: v.parcel._id,
          name: v.parcel.name,
          weight: v.parcel.weight,
          quantity: v.quantity,
        }));
        res.status(201).json({ message: "loaded", parcels: parcels });
      } else {
        res.status(404).json({ message: "Truck not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

//unload truck and return parcels
exports.unloadTruck = (req, res, next) => {
  //validation errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  }

  Truck.findByIdAndUpdate(req.params.id, {
    $set: {
      parcels: [],
    },
  })
    .populate("parcels.parcel")
    .then((data) => {
      if (data) {
        if (data.parcels.length > 0) {
          let parcels = data.parcels.map((v) => ({
            _id: v.parcel._id,
            name: v.parcel.name,
            weight: v.parcel.weight,
            quantity: v.quantity,
          }));
          let newParcels = reduceParcels(parcels);
          res.status(201).json({ message: "unloaded", parcels: newParcels });
        } else {
          res.status(400).json({ message: "Truck is empty" });
        }
      } else {
        res.status(404).json({ message: "Truck not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
