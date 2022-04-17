function defaultController(req, res, next) {
  res.status(404).json({ message: "path not found" });
}

module.exports = defaultController;
