'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   
      queryInterface.addIndex(
        'hmoplans',
        ['insurance_id', 'gifshipId', 'gifshipTypeId', 'gifshipPackageId', 'hmo_id', 'plan'],
        {
          name: 'hmoinsurance_idplan',
          indicesType: 'UNIQUE',
          unique:true
          
        }
      );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
