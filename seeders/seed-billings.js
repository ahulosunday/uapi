'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('permissions', [

    { id:136,
      name: 'MAKE_BILLINGS',
      description:"Can make billings for patient",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    }
    ,
       { id:137,
      name: 'MAKE_REFUND_OUTPATIENT',
      description:"Can make refund for out-patient",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    }
    ,
       { id:138,
      name: 'VIEW_POST',
      description:"Can view transactions to post to GL",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    }
        ,
       { id:139,
      name: 'POST_GL',
      description:"Can make post to GL",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    }
    


  ], {});

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
