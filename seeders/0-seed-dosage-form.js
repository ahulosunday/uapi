'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
 
    await queryInterface.bulkInsert('dosage_forms', [
      
      { id:1,
        name: 'Tablets',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:2,
        name: 'Capsules',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:3,
        name: 'Suspension',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:4,
        name: 'Injection',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:5,
        name: 'Suppository',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:6,
        name: 'IVF',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:7,
        name: 'Drop',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:8,
        name: 'Syrup',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:9,
        name: 'Cream',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:10,
        name: 'Ointment',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:11,
        name: 'Pessary',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:12,
        name: 'Inhalation',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:13,
        name: 'Consumables',
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:14,
        name: 'Infusions',
        staff_id: 1,
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
