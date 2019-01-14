'use strict';
module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define('Log', {
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
    Log.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Log.belongsTo(models.Item, {
      foreignKey: "itemId",
      onDelete: "CASCADE"
    });
  };
  return Log;
};
