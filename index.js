require("dotenv").config();

const server = require("./Utils/server");
const { connect } = require("./Utils/database");

//run the app
(async function run() {
  try {
    //connect to db
    await connect();
    console.log("DB connected!");
    // listen on port number
    server.listen(process.env.PORT, () => {
      console.log(`Listenining on port ${process.env.port}!`);
    });
  } catch (error) {
    next(error);
  }
})();
