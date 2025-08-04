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
