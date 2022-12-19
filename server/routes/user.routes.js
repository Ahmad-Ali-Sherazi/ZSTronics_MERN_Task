const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app => {
  const users = require("../controllers/userControllers.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/create", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);
  
  // Login
  router.post("/login", users.login);

  // Update a User with id and logout (use update api as loggedIn status stores in DB)
  router.put("/:id", users.update); 

  // Delete a User with id
  router.delete("/:id", users.delete);
  
  // Get all activities of a user
  router.post("/activities", users.activities);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/api/users", router);
};
