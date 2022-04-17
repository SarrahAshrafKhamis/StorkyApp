exports.mapParcels = (parcels) => {
  return parcels.map((v) => ({
    _id: v.parcel._id,
    name: v.parcel.name,
    weight: v.parcel.weight,
    quantity: v.quantity,
  }));
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
