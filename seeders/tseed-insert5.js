'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables = 'payment'
    await queryInterface.sequelize.query(` ALTER TABLE payment DROP INDEX payment_service_name_payment_id; `);
    await queryInterface.sequelize.query(`
    insert into  payment(
        id,	
        name,	
        phone,	
        bank,	
        transid,	
        tdate,	
        amount,	
        editedby,	
        vdate,	
        narration,	
        confirm,
        service_id,	
        service_name,	
        jid1,	
        batch_no,	
        confirmed_by,	
        confirmed_id,	
        confirmed_date,	
        payment_type,	
        uid,	
        payment_id,	
        confirm_note,	
        isconfirm,	
        jid2,
        createdAt,
        updatedAt	
        ) select 
        id,	
        name,	
        phone,	
        bank,	
        transid,	
        tdate,	
        amount,	
        editedby,	
        vdate,	
        narration,	
        confirm,
        service_id,	
        service_name,	
        jid1,	
        batch_no,	
        confirmed_by,	
        confirmed_id,	
        confirmed_date,	
        payment_type,	
        uid,	
        payment_id,	
        confirm_note,	
        isconfirm,	
        jid2,
        tdate,
        tdate
         from ${dbtables} where tdate >= '2024-01-01 00:00:00' ;
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
