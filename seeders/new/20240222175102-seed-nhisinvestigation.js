'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:106,
        name: 'VIEW_MAP_NINVESTIGATION',
        description:"Can view map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:107,
        name: 'ADD_MAP_NINVESTIGATION',
        description:"Can add map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:108,
        name: 'EDIT_MAP_NINVESTIGATION',
        description:"Can edit map Ivestigation",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:109,
        name: 'DELETE_MAP_NINVESTIGATION',
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
