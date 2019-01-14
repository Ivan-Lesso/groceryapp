'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      purchased: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      listId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", // delete post if parent topic is deleted
        allowNull: false,    // validation to prevent null value
        references: {        // association information
          model: "Lists",   // table name
          key: "id",
          as: "listId"      
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};
