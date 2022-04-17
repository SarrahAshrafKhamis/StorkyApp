exports.checkIfValidSchemaFields = (body, allowedKeys) => {
  const keys = Object.keys(body);
  return keys.every((key) => allowedKeys.includes(key));
};
