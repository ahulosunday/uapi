'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    const dbtables = 'refund'
    await queryInterface.sequelize.query(`
delete from ${dbtables} where batchno in ('1706620049','1706620080', '1706620081','1706620083');
`);
await queryInterface.sequelize.query(`
insert into refund(pid,	narration,	tdate,	vdate,	amount,	uid,	bank,	batchno, refid,	tablename,	name,	phone,	qty,	createdAt,	updatedAt,	pmode)	 
 select pid,	narration,	tdate,	vdate,	amount,	uid,	bank,	batchno,	refid,	tablename,	name,	phone,	qty,	tdate,	tdate,	'POS' from ${dbtables} where pid in (select id from payment);
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
