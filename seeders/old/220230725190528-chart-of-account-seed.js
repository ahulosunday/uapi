'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:74,
        name: 'VIEW_CHARTOFACCOUNT',
        description:"Can view Chart of Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:75,
        name: 'ADD_CHARTOFACCOUNT',
        description:"Can add chart of Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:76,
        name: 'EDIT_CHARTOFACCOUNT',
        description:"Can edit chart of Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:77,
        name: 'DELETE_CHARTOFACCOUNT',
        description:"Can delete chart of Account",
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
