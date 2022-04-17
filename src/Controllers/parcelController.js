const { validationResult } = require("express-validator");

const Parcel = require("../Models/parcelSchema");

exports.postParcel = (req, res, next) => {
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

  new Parcel({
    name: req.body.name,
    weight: req.body.weight,
  })
    .save()
    .then((data) => {
      res.status(201).json({ message: "added", data: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllParcels = (req, res, next) => {
  Parcel.find({})
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getParcel = (req, res, next) => {
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

  Parcel.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "parcel not found" });
      } else {
        res.status(200).json({ data: data });
      }
    })
    .catch((error) => {
      next(error);
    });
};
