exports.getTruckDetails = (truck, time) => {
  let numberOfParcels = 0;
  let truckWeight = truck.baseWeight;
  if (truck.parcels.length > 0) {
    truck.parcels.forEach((parcel) => {
      if (parcel.createdAt < time) {
        numberOfParcels += parcel.quantity;
        truckWeight += parcel.parcel.weight * parcel.quantity;
      }
    });
  }
  return { numberOfParcels: numberOfParcels, truckWeight: truckWeight };
};
