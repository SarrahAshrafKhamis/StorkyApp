exports.getTruckDetails = (truck) => {
  let numberOfParcels = 0;
  let truckWeight = truck.baseWeight;
  if (truck.parcels.length > 0) {
    truck.parcels.forEach((parcel) => {
      numberOfParcels += parcel.quantity;
      truckWeight += parcel.parcel.weight * parcel.quantity;
    });
  }
  return { numberOfParcels: numberOfParcels, truckWeight: truckWeight };
};

exports.reduceParcels = (parcels) => {
  let newParcels = [];
  let ids = [];
  parcels.forEach((v) => {
    let index = ids.indexOf(v._id);
    if (index == -1) {
      ids.push(v._id);
      newParcels.push(v);
    } else {
      newParcels[index].quantity += v.quantity;
    }
  });
  return newParcels;
};

exports.checkIfValidSchemaFields = (body, allowedKeys) => {
  const keys = Object.keys(body);
  return keys.every((key) => allowedKeys.includes(key));
};
