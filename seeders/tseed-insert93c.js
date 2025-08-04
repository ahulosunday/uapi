'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    
    
    await queryInterface.sequelize.query(`call Outpts_TestProc();`)

    await queryInterface.sequelize.query(`ALTER TABLE payment ADD UNIQUE payment_service_name_payment (service_name, payment_id);

`);
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