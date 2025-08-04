'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:90,
        name: 'VIEW_MAP_INVESTIGATION',
        description:"Can view map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:91,
        name: 'ADD_MAP_INVESTIGATION',
        description:"Can add map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:92,
        name: 'EDIT_MAP_INVESTIGATION',
        description:"Can edit map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:93,
        name: 'DELETE_MAP_INVESTIGATION',
        description:"Can delete map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      }


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
