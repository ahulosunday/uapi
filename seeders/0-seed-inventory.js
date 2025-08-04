'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('permissions', [
      
      { id:176,
        name: 'EDIT_INVENTORY',
        description:"Can edit Inventory",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:177,
        name: 'DELETE_INVENTORY',
        description:"Can delete Inventory",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:178,
        name: 'ADD_INVENTORY',
        description:"Can add Inventory ",
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:179,
        name: 'VIEW_INVENTORY',
        description:"Can view inventory ",
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
