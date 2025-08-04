'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:94,
        name: 'VIEW_MAP_SERVICE',
        description:"Can view map Services",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:95,
        name: 'ADD_MAP_SERVICE',
        description:"Can add map Services",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:96,
        name: 'EDIT_MAP_SERVICE',
        description:"Can edit map Services",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:97,
        name: 'DELETE_MAP_SERVICE',
        description:"Can delete map Services",
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
