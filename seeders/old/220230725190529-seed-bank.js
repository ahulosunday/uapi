'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:78,
        name: 'VIEW_BANK',
        description:"Can view bank account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:79,
        name: 'ADD_BANK',
        description:"Can add bank Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:80,
        name: 'EDIT_BANK',
        description:"Can edit bank Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:81,
        name: 'DELETE_BANK',
        description:"Can delete bank Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:82,
        name: 'DELETE_ACCOUNT',
        description:"Can delete Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:83,
        name: 'ADD_ACCOUNT',
        description:"Can add Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:84,
        name: 'VIEW_ACCOUNT',
        description:"Can view Account",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:85,
        name: 'EDIT_ACCOUNT',
        description:"Can edit Account",
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
