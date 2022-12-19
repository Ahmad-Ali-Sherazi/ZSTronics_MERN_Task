const db = require("../models/index");
const User = db.users;
const UserActivities = db.userActivity;
// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name && !req.body.userName) { 
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // to check if the user is already registered or not
  User.findOne({
    userName: req.body.userName || req.body.name,
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      // Create a user
      const user = new User({
        userName: req.body.userName || req.body.name,
        password: req.body.password,
        isLoggedIn: false
      });
    
      // Save user in the database
      user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
    }
    else{
      return res.status(401).send({ message: "User Already Registered!" });
    }
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const userName = req.query.userName;

  User.find(userName)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Update user's data
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else {
        const userActivity = new UserActivities({
          userName: data.userName
        });
        if(req.body.password != undefined) {
          userActivity.passwordResetTime = Date.now();
        }
        else if (req.body.isLoggedIn != undefined) {
          userActivity.logoutTime = Date.now();
        }
        // Save  user's activity in the database
        userActivity
        .save(userActivity)
        .then(data => {
          res.send({ message: "user was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while updated the user activity."
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};
// Login
exports.login = (req, res) => {
  User.findOne({
    userName: req.body.userName,
  })
  .exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (req.body.password != user.password) {
      const userActivity = new UserActivities({
        userName: req.body.userName,
        invalidAttemptTime: Date.now()
      });
      // Save user's activity in the database
      userActivity
      .save(userActivity)
      .then(data => {
        //console.log(data);
        // res.send({ message: "user was successfully logged-out." });
      })
      .catch(err => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while updated the user activity."
        });
      });
      return res.status(401).send({ message: "Invalid Password!" });
    } 
    // to update logged in status
    User.findByIdAndUpdate(user._id, {isLoggedIn:true}, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Database error cannot find user ID for updated logged in status"
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating user logged in status id=" + id
      });
    });
    const userActivity = new UserActivities({
      userName: req.body.userName,
      loginTime: Date.now()
    });
    // Save user's activity in the database
    userActivity
    .save(userActivity)
    .then(data => {
      //console.log(data);
      return res.send({ message: "user was successfully logged-in." , id: data.id, userName: data.userName});
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while updated the user activity."
      });
    });
  });
};
// get all activities of a user
exports.activities = (req,res) => {
  const userName = req.body.userName;
  UserActivities.find({userName: userName})
  .then(data => {
    if(data.length > 0){
      res.send(data);
    } else {
      res.status(401).send( " Cannot find user activities against specified user");
    }
    
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user's activities."
    });
  });
};