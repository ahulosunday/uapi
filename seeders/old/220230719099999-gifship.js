'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
     await queryInterface.bulkInsert('gifships', [{
       name: 'Formal Sector Social Health Insurance Programmes (FSSHIP)',
       userId: '1',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
     },{
       name: 'Informal Sector Social Health Insurance Programmes (ISSHIP)',
       userId: '1',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
     },{
       name: 'Vulnerable Group Social Health Programmes (VSSHP)',
       userId: '1',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
     }
     
     ], {});
    
  },

  async down (queryInterface, DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     **/ 
     await queryInterface.bulkDelete('gifships', null, {});
     
  }
};
