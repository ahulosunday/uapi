'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('chart_of_account', [

{
	id: 1,
  accountCode: '-',
  lineCode:'1',
	name: 'Chart of Account',
  parendId: 0,
  levelCode: '1',
  isParent: 1,
  inuse: 1,
  entity_id:1,
  acc_type_id:1,
  tdate: new Date(),
	updatedAt: new Date(),
  createdAt: new Date()
	},

  ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
