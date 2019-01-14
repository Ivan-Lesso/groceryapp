'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    purchased: DataTypes.BOOLEAN,
    listId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
    Item.hasMany(models.Log, {
      foreignKey: "itemId",
      as: "logs"
    });
  };
  return Item;
};
