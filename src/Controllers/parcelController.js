const { validationResult } = require("express-validator");
const handleErrors = require("../../Utils/errorHandler");

module.exports = (db) => {
  let postParcel = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    try {
      let parcel = await db.postParcel(req.body.name, req.body.weight);
      if (parcel) {
        res.status(201).json({ message: "added", data: parcel });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  };

  let getAllParcels = async (req, res, next) => {
    try {
      let parcels = await db.getAllParcels();
      if (parcels) {
        res.status(200).json({ data: parcels });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  };

  let getParcel = async (req, res, next) => {
    //validation errors
    let errors = validationResult(req);
    handleErrors(errors, next);

    try {
      let parcel = await db.getParcelById(req.params.id);
      if (parcel) {
        res.status(200).json({ data: parcel });
      } else {
        res.status(404).json({ message: "parcel not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  return {
    postParcel: postParcel,
    getAllParcels: getAllParcels,
    getParcel: getParcel,
  };
};
