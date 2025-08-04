'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('measurements', [

    { id:1,
      name: 'mg',
      dosage_form_id:2 ,
      staff_id: 1,
      createdAt: '2023-09-12 06:51:23',
     updatedAt: '2023-09-12 06:51:23'
    },
    { id:2,
        name: 'mg',
        dosage_form_id:1 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:3,
        name: 'Mls',
        dosage_form_id:3 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:4,
        name: 'mls',
        dosage_form_id:8 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:5,
        name: 'mg',
        dosage_form_id:8 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:7,
        name: 'mls',
        dosage_form_id:7 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:8,
        name: 'Mls',
        dosage_form_id:5 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:9,
        name: 'Mls',
        dosage_form_id: 4,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:10,
        name: 'mg',
        dosage_form_id: 6,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:11,
        name: 'mg',
        dosage_form_id:3 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:12,
        name: 'g',
        dosage_form_id:9 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:13,
        name: 'IU',
        dosage_form_id:9 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:14,
        name: 'mg',
        dosage_form_id:9 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:15,
        name: 'mg',
        dosage_form_id:4 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:16,
        name: 'mg',
        dosage_form_id:7 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:17,
        name: 'supp',
        dosage_form_id: 6,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:18,
        name: 'pieces',
        dosage_form_id:13 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:19,
        name: 'packs',
        dosage_form_id:13 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:20,
        name: 'pair',
        dosage_form_id:13 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:21,
        name: 'ug',
        dosage_form_id: 1,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:22,
        name: 'IU',
        dosage_form_id:4 ,
        staff_id: 1,
        createdAt: '2023-09-12 06:51:23',
       updatedAt: '2023-09-12 06:51:23'
      },
      { id:23,
        name: '%',
        dosage_form_id:13 ,
        staff_id: 1,
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
