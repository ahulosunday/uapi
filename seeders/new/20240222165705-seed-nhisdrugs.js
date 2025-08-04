'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
    { id:102,
      name: 'VIEW_MAP_NDRUG',
      description:"Can view map drugs",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:103,
      name: 'ADD_MAP_NDRUG',
      description:"Can add map drugs",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:104,
      name: 'EDIT_MAP_NDRUG',
      description:"Can edit map drugs",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:105,
      name: 'DELETE_MAP_NDRUG',
      description:"Can delete map drugs",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    }
 ],
 {});
 },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
