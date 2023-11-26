const db = require("../model");
const User = db.users;
// const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // validate
  if (!req.body.uid) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  // create
  const user = {
    user_id: req.body.uid,
    display_name: req.body.display_name,
    email: req.body.email,
    last_login: req.body.last_login,
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving users.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  User.findOne({ where: { user_id: req.params.uid } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  // validate
  if (!req.params.uid) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  // update
  User.update(req.body, {
    where: { user_id: req.params.uid }, // ??? check the source
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "User was successfully updated.",
        });
      } else {
        res.send({
          message: `Couldn't update the User.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while updating the User",
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  // delete
  User.destroy({
    where: { user_id: req.params.uid },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "User was successfully deleted.",
          result: true,
        });
      } else {
        res.send({
          message: `Couldn't delete the User.`,
          result: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while deleting the User",
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};
