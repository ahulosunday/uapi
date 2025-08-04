'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    
    await queryInterface.sequelize.query(`call Outpts_InvestigationProc();`);
    await queryInterface.sequelize.query(`call Outpts_ServiceProc();`);
    
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