'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:70,
        name: 'VIEW_ACCOUNT_TYPE',
        description:"Can view Account Type",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:71,
        name: 'ADD_ACCOUNT_TYPE',
        description:"Can add account type",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:72,
        name: 'EDIT_ACCOUNT_TYPE',
        description:"Can edit account type",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:73,
        name: 'DELETE_ACCOUNT_TYPE',
        description:"Can delete account type",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },


    ], {});
  },

  async down (queryInterface, DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
