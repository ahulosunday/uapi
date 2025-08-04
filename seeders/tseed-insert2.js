'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables = 'bank'
    await queryInterface.sequelize.query(`insert into bank(id,	acc_name,	acc_number,	acc_type,	bank,	entity_id, chart_of_account_id,	tdate,	createdAt,	updatedAt)
    select id, acc_name,acc_number, acc_type, bank, entity_id, chart_of_account_id, tdate,  tdate, tdate from ${dbtables};`);
   
        
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
