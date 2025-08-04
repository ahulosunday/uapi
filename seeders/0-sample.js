
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('test_samples', [

        {
            id: 1,
            name: 'aspirate',
            staff_id:1,
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            {
              id: 2,
              name: 'Stool',
                staff_id:1,
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 3,
                name: 'Semen',
                  staff_id:1,
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 4,
                    name: 'Sputum',
                      staff_id:1,
                    createdAt: '2020-07-02 07:38:46',
                    updatedAt: '2020-07-02 07:38:46'
                    },
                    {
                        id: 5,
                        name: 'Urine',
                          staff_id:1,
                        createdAt: '2020-07-02 07:38:46',
                        updatedAt: '2020-07-02 07:38:46'
                        },
                            {
                                id: 7,
                                name: 'blood',
                                  staff_id:1,
                                createdAt: '2020-07-02 07:38:46',
                                updatedAt: '2020-07-02 07:38:46'
                                },
                                {
                                    id: 8,
                                    name: 'Swab',
                                      staff_id:1,
                                    createdAt: '2020-07-02 07:38:46',
                                    updatedAt: '2020-07-02 07:38:46'
                                    },
                                    {
                                        id: 9,
                                        name: 'SKIN',
                                          staff_id:1,
                                        createdAt: '2020-07-02 07:38:46',
                                        updatedAt: '2020-07-02 07:38:46'
                                        },
                                        {
                                            id: 10,
                                            name: 'cerebrospinal fluid',
                                              staff_id:1,
                                            createdAt: '2020-07-02 07:38:46',
                                            updatedAt: '2020-07-02 07:38:46'
                                            },
                                            {
                                                id: 11,
                                                name: 'pus',
                                                  staff_id:1,
                                                createdAt: '2020-07-02 07:38:46',
                                                updatedAt: '2020-07-02 07:38:46'
                                                },
                                                {
                                                    id: 12,
                                                    name: 'chemistry test',
                                                      staff_id:1,
                                                    createdAt: '2020-07-02 07:38:46',
                                                    updatedAt: '2020-07-02 07:38:46'
                                                    },

             
            
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