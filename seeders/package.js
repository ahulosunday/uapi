'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    
     await queryInterface.bulkInsert('gifshiptypes', [{
       name: 'NHIA social (Civil Servants)',
       userId: '1',
       insurance_id: 1,
       gifshipId: 1,
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
     },{
       name: 'GIFSHIP',
       userId: '1',
       insurance_id: 1,
       gifshipId: 2,
       createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
     },{
       name: 'Organized Private sector',
       userId: '1',
       insurance_id: 1,
        gifshipId: 1,
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
     await queryInterface.bulkDelete('gifships', null, {});
     
  }
};
