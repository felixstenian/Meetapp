"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColunm("users", "avatar_id", {
      type: Sequelize.INTEGER,
      references: { model: "files", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColunm("users", "vatar_id");
  }
};
