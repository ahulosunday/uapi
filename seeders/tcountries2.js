'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.sequelize.query(`INSERT INTO regions (id, name, countryId, userId, createdAt, updatedAt) VALUES
     (1, 'North Central', 1, 1, '2023-10-13 12:05:11', '2023-10-13 12:05:11'),
     (2, 'North East', 1, 1, '2023-10-13 12:05:25', '2023-10-13 12:05:25'),
     (3, 'North West', 1, 1, '2023-10-13 12:05:45', '2023-10-13 12:05:45'),
     (4, 'South Easth', 1, 1, '2023-10-13 12:05:58', '2023-10-13 12:05:58'),
     (5, 'South West', 1, 1, '2023-10-13 12:06:22', '2023-10-13 12:06:22'),
     (6, 'South South', 1, 1, '2023-10-13 12:06:33', '2023-10-13 12:06:33');`);
  
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
