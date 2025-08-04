'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
     * truncate payment;
truncate refund;
truncate ewallets;
truncate outpts;
truncate accounts;
truncate chart_of_account;
truncate bank;
    */
    await queryInterface.sequelize.query('truncate payment');
    await queryInterface.sequelize.query('truncate refund');
    await queryInterface.sequelize.query('truncate ewallets');
    await queryInterface.sequelize.query('truncate outpts');
    await queryInterface.sequelize.query('truncate accounts');
    await queryInterface.sequelize.query('truncate chart_of_account');
    await queryInterface.sequelize.query('truncate bank');
    await queryInterface.sequelize.query('truncate role_permissions');
    await queryInterface.sequelize.query('insert into role_permissions(`roleId`,`permissionId`,`createdAt`,`updatedAt`) select 1, id, createdAt, updatedAt from permissions');
        
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
