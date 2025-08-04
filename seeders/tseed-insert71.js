'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    await queryInterface.sequelize.query(`update ewallets set bank = 5 where id <> 0;`);

    await queryInterface.sequelize.query(`insert into chart_of_account set id = 533,
    accountCode = '4501',
    lineCode = '1',
    name = 'OTHERS',
    parendId = '204',
    levelCode = '1',
    isParent = '0',
    inuse = '1',
    entity_id = '1',
    acc_type_id = '10',
    tdate = '2024-05-15 12:56:53',  
    createdAt = '2024-05-15 12:56:53', 
    updatedAt = '2024-05-15 12:56:53';`);
    await queryInterface.sequelize.query(` insert into accounts set
    id = 6579,
name = 'Others',
acc_type_id  = '10', 
entity_id = 1, 
sub = '204',
table_name = 'chart_of_account', 
table_id  = '533',   
acc_code = '4501',
d_created = '2024-05-15 12:56:53', 
createdAt = '2024-05-15 12:56:53',  
updatedAt  = '2024-05-15 12:56:53'; `);

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