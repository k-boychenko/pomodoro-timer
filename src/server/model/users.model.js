module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      display_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      last_login: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false
    });
    return User;
  };