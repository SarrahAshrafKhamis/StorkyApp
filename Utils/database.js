require("dotenv").config();
const mongoose = require("mongoose");

const Parcel = require("../src/Models/parcelSchema");
const Truck = require("../src/Models/truckSchema");

exports.connect = () => {
  return mongoose.connect(process.env.DATABASE_LOCAL);
};

exports.disconnect = () => {
  return mongoose.connection.close();
};

exports.postParcel = (name, weight) => {
  return new Parcel({
    name: name,
    weight: weight,
  }).save();
};

exports.getAllParcels = () => {
  return Parcel.find({});
};

exports.getParcelById = (id) => {
  return Parcel.findById(id);
};

exports.postTruck = (name, baseWeight, parcels) => {
  return new Truck({
    name: name,
    baseWeight: baseWeight,
    parcels: parcels,
  }).save();
};

exports.getAllTrucks = () => {
  return Truck.find({});
};

exports.getTruckById = (id) => {
  return Truck.findById(id).populate("parcels.parcel");
};

exports.putTruckById = (id, body) => {
  return Truck.findByIdAndUpdate(
    id,
    {
      $set: {
        ...body,
      },
    },
    { new: true }
  );
};

exports.loadTruck = (id, parcels) => {
  return Truck.findByIdAndUpdate(
    id,
    {
      $push: {
        parcels: {
          $each: parcels,
        },
      },
    },
    { new: true }
  ).populate("parcels.parcel");
};

exports.unloadTruck = (id) => {
  return Truck.findByIdAndUpdate(id, {
    $set: {
      parcels: [],
    },
  }).populate("parcels.parcel");
};
