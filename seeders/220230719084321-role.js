'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
      await queryInterface.bulkInsert('roles', [{
        name: 'SuperAdmin',
        id:1,
       description: 'Super Administrator',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },{
         name: 'Admin',
        id:2,
       description: 'Administrator',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
      },
      {
         name: 'Guest',
        id:3,
       description: 'Guest User',
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
      },
      {
        name: 'Account',
       id:4,
      description: 'Account',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'NHIS',
       id:5,
      description: 'NHIS',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'Doctor',
       id:6,
      description: 'Doctor',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'Pharmacy',
       id:7,
      description: 'Pharmacy',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'Nurse',
       id:8,
      description: 'Nurse',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'Laboratory',
       id:9,
      description: 'Laboratory',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'inventory',
       id:10,
      description: 'inventory',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     },
     {
        name: 'medicalrecord',
       id:11,
      description: 'medicalrecord',
      createdAt: '2023-07-31 06:51:23',
      updatedAt: '2023-07-31 06:51:23'
     }
      ], {});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */ 
     await queryInterface.bulkDelete('roles', null, {});
    
  }
};
