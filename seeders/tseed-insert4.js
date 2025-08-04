'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables = 'outpts'
    await queryInterface.sequelize.query(`delete FROM accounts WHERE table_name <> 'chart_of_account';
    `);

    await queryInterface.sequelize.query(`
    insert into outpts (outpt_id,	name,	address,	phone,	tdate,	addedby,	email,	createdAt,	updatedAt	
    ) select outpt_id,	name,	address,	phone,	tdate,	addedby,	email, tdate, tdate	
     from ${dbtables} ;
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
