const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baseWeight: {
    type: Number,
    required: true,
  },
  parcels: [
    {
      parcel: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Parcel",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Truck", Schema);
