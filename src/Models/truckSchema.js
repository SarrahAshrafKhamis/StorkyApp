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
      type: new mongoose.Schema(
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
        { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
      ),
    },
  ],
});

module.exports = mongoose.model("Truck", Schema);
