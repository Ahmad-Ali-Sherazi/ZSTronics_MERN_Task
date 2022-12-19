const express = require("express");
const db = require("./models");
const app = express();
require('dotenv').config();
require("./routes/user.routes")(app);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
