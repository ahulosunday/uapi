'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    
     await queryInterface.bulkInsert('insurances', [
      {
       name: 'NHIA',
       staff_id: 1,
       description:'National Health Insurance Authority (NHIA)',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
     },
      {
       name: 'SSHIA',
       staff_id: 1,
       description:'State Social Health Insurance Agency (SSHIAs)',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
     }
     ,
      {
       name: 'PHSS',
       staff_id: 1,
       description:'Private Health Insurance',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
     }
     ,
      {
       name: 'RETAINERSHIP',
       staff_id: 1,
       description:'Retainership Health Insurance',
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
