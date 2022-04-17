const express = require("express");
const router = express.Router();

const defaultController = require("../Controllers/defaultController");

//default route for non-matching routes
router
  .post("*", defaultController)
  .get("*", defaultController)
  .put("*", defaultController)
  .delete("*", defaultController);

module.exports = router;
