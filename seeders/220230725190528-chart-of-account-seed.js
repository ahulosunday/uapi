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

      { id:140,
        name: 'RAISE_PV',
        description:"Can create pv",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:141,
        name: 'DELETE_PV',
        description:"Can delete pv",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:142,
        name: 'EDIT_PV',
        description:"Can edit pv",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:143,
        name: 'POST_PV',
        description:"Can post pv to GL",
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
