'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('permissions', [
   
    { id:130,
      name: 'VIEW_REPORTS',
      description:"Can view reports",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:131,
      name: 'MAKE_PAYMENT',
      description:"Can make payment",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:132,
      name: 'VIEW_STATEMENT',
      description:"Can geenerate statement for patient",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:133,
      name: 'MAKE_REFUND',
      description:"Can geenerate refund for patient",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:134,
      name: 'MAKE_DEPOSIT',
      description:"Can geenerate deposit for patient",
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:135,
      name: 'MAKE_WITHDRAWAL',
      description:"Can geenerate withdrawal for patient",
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
