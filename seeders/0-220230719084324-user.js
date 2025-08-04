'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
      await queryInterface.bulkInsert('user', [{
        username: 'admin@gmail.com',
        id:1,
        password: '$2a$10$CsHXjZe/svHCiQ2iG74Ko.B0rLtUZ9HwWiCUQ.7kO3C2EnQxBcm.u',
        surname: 'Super-admin',
        othername: 'Admin',
        email:'admin@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d',
        roleid:1,
        imgurl: '1589666695.png',
        phone:'1000000000',
        department:'admin',
        isActive:1,
        createdAt: '2024-06-07 01:59:23',
       updatedAt: '2024-06-07 01:59:23'
       
      }

      ], {});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */ 
     await queryInterface.bulkDelete('user', null, {});
    
  }
};
