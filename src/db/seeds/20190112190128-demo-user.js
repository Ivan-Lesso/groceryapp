'use strict';
const bcrypt = require("bcryptjs");

let personas = ['mom','dad','son','daughter'];

let users = [];

personas.forEach((persona) => {
  let salt = bcrypt.genSaltSync();
  let hashedPassword = bcrypt.hashSync(persona+'password', salt);
  users.push({
    email: persona+'@gmail.com',
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  });
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
