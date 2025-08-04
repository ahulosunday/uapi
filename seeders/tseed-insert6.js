'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    await queryInterface.sequelize.query(`
    delete from payment where service_name = 'Additional Item' and payment_id not in (select old_id from additional_item_prescriptions);
      `);
    await queryInterface.sequelize.query(` delete from payment where service_name = 'Prescribed Drugs' and payment_id not in (select old_id from prescribed_drugs);
    `); 
    await queryInterface.sequelize.query(`delete from payment where service_name = 'Prescribed Investigation' and payment_id not in (select old_id from prescribed_investigations);
    `); 
    await queryInterface.sequelize.query(` delete from payment where service_name = 'Prescribed Services' and payment_id not in (select old_id from prescribed_services);
    `); 
    await queryInterface.sequelize.query(`delete from payment where service_name = 'Prescribed Test' and payment_id not in (select old_id from prescribed_tests);
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
