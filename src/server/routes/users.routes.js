module.exports = app => {
    const users = require("../controller/users.controller");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    // Retrieve all users
    router.get("/", users.findAll);
    // Retrieve a single User with id
    router.get("/:uid", users.findOne);
    // Update a User with id
    router.put("/:uid", users.update);
    // Delete a User with id
    router.delete("/:uid", users.delete);
    // Delete all users
    router.delete("/", users.deleteAll);
    
    app.use('/api/users', router);
  };