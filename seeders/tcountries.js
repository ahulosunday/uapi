'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.sequelize.query(`INSERT INTO countries (id, name, code, shortname, currency, userId, createdAt, updatedAt) VALUES
     (1, 'Nigeria', '+234', 'NGN', 'Naira', 1, '2023-10-13 12:04:53', '2023-10-13 12:04:53');
    `);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
