'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    queryInterface.addIndex(
        'role_permissions',
        ['roleId', 'permissionId'],
        {
          indicesType: 'UNIQUE',
           unique:true
          
          
         
        }
      );
         queryInterface.addIndex(
        'hospitals',
        ['bank', 'accnumber'],
        {
          indicesType: 'UNIQUE',
          unique:true
          
        }
      );
         queryInterface.addIndex(
        'enrolee_rrr_codes',
        ['userId', 'user_rrrId'],
        {
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
