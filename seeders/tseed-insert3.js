'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables = 'accounts'
    await queryInterface.sequelize.query(`insert into accounts (id, name,	acc_type_id, entity_id, sub, table_name, table_id, acc_code, d_created,	createdAt, updatedAt)	
    select id,  name, acc_type_id,  entity_id, sub, table_name, table_id, acc_code, d_created,  createdAt, updatedAt from ${dbtables};
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
