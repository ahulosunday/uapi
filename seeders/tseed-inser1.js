'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables = 'chart_of_account'
    await queryInterface.sequelize.query(`insert into chart_of_account(id,accountCode,lineCode,name,parendId,levelCode,isParent,inuse,entity_id, tdate, acc_type_id, createdAt, updatedAt)
    SELECT id,accountCode,lineCode, name,parendId,levelCode,isParent,inuse,entity_id,tdate,acc_type_id, tdate, tdate FROM ${dbtables};
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
