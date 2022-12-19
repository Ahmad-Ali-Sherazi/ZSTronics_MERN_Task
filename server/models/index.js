const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.CONNECTION_STRING;
db.users = require("./userModel.js")(mongoose);
db.userActivity = require("./userActivityModel.js")(mongoose);
module.exports = db;
