require("dotenv").config();

const serverFunc = require("./Utils/server");
const db = require("./Utils/database");

//run the app
(async function run() {
  try {
    //inject db to server
    const server = serverFunc(db);
    //connect to db
    await db.connect();
    console.log("DB connected!");
    // listen on port number
    server.listen(process.env.PORT, () => {
      console.log(`Listenining on port ${process.env.port}!`);
    });
  } catch (error) {
    next(error);
  }
})();
