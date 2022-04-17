const express = require("express");
const body_parser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const parcelRouter = require("../src/Routers/parcelRouter");
const truckRouter = require("../src/Routers/truckRouter");
const defaultRouter = require("../src/Routers/defaultRouter");

//create the server
const server = express();

////Middlewares
server.use(cors());

//Logger
server.use(morgan("dev"));

//Body-parser
server.use(body_parser.urlencoded({ extended: false }));
server.use(body_parser.json());

//Routers
server.use("/parcels", parcelRouter);
server.use("/trucks", truckRouter);
server.use("/*", defaultRouter);

//Error middleware
server.use((error, req, res, next) => {
  let status = error.status || 500;
  res.status(status).json({ Error: error + "" });
});

module.exports = server;
