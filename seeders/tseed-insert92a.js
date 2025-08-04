'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    await queryInterface.sequelize.query(`call EwalletAntenatalProc();`);
    await queryInterface.sequelize.query(`call EwalletAntenatalProc2();`);
    
},

async down (queryInterface, sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
};