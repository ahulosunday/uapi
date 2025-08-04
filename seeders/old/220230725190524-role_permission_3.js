'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */ 
 
    await queryInterface.bulkInsert('role_permissions', [
      { id: 55,
         
     roleId: 3,
     permissionId: 23,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 56,
     roleId: 3,
     permissionId: 24,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 57,
     roleId: 3,
     permissionId: 25,
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
     await queryInterface.bulkDelete('role_permissions', null, {});
     
  }
};