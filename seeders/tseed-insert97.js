'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    //
    await queryInterface.sequelize.query(`truncate role_permissions;`);
    await queryInterface.sequelize.query(`call PermissionProc();`);
    },

async down (queryInterface, sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   * 
  

UPDATE payment, additional_item_prescriptions
SET payment.service_id = additional_item_prescriptions.drug_id, 
payment.uid = additional_item_prescriptions.patient_id,
payment.payment_id = additional_item_prescriptions.id 
WHERE payment.payment_id = additional_item_prescriptions.old_id and payment.service_name = 'Additional Item' and payment.id <> 0



   
   */
}
};