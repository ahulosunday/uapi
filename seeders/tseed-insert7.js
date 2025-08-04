'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables ='ewallets'
    await queryInterface.sequelize.query(`
    insert into ewallets(id,	customer_id,	narration,	amt,	vdate,	tablename,	tableid,	uid,	createdAt,	updatedAt,	bank,	pmode	
    ) select id,	customer_id,	narration,	amt,	vdate,	tablename,	tableid,	uid,	vdate,	vdate,	1,	'POS'	
    from ${dbtables} where vdate >= '2024-01-01';
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