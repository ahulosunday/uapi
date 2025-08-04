
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('units', [

        {
            id: 1,
            name: 'Packs',
            staff_id:1,
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            {
                id: 2,
                
                name: 'Cartons',
                staff_id:1,
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 3,
                   
                    name: 'Capsules',
                    staff_id:1,
                    createdAt: '2020-07-02 07:38:46',
                    updatedAt: '2020-07-02 07:38:46'
                    },
                    {
                        id: 4,
                       
                        name: 'Caplets',
                        staff_id:1,
                        createdAt: '2020-07-02 07:38:46',
                        updatedAt: '2020-07-02 07:38:46'
                        },
                        {
                            id: 5,
                            
                            name: 'Tablets',
                            staff_id:1,
                            createdAt: '2020-07-02 07:38:46',
                            updatedAt: '2020-07-02 07:38:46'
                            },
                            {
                                id: 6,
                               
                                name: 'Nebules',
                                staff_id:1,
                                createdAt: '2020-07-02 07:38:46',
                                updatedAt: '2020-07-02 07:38:46'
                                },
                                {
                                    id: 7,
                                    name: 'Pairs',
                                    staff_id:1,
                                    createdAt: '2020-07-02 07:38:46',
                                    updatedAt: '2020-07-02 07:38:46'
                                    },
                                    {
                                        id: 8,
                                        name: 'Vial',
                                        staff_id:1,
                                        createdAt: '2020-07-02 07:38:46',
                                        updatedAt: '2020-07-02 07:38:46'
                                        },
                                        {
                                            id: 9,
                                            name: 'Sachet',
                                            staff_id:1,
                                            createdAt: '2020-07-02 07:38:46',
                                            
                                            updatedAt: '2020-07-02 07:38:46'
                                            },
                                            {
                                                id: 10,
                                                name: 'Pieces',
                                                staff_id:1,
                                                createdAt: '2020-07-02 07:38:46',
                                                
                                                updatedAt: '2020-07-02 07:38:46'
                                                },
                                                {
                                                    id: 11,
                                                    name: 'Tubes',
                                                    staff_id:1,
                                                    createdAt: '2020-07-02 07:38:46',
                                                    
                                                    updatedAt: '2020-07-02 07:38:46'
                                                    },
                                                    {
                                                        id: 12,
                                                        name: 'Ampoules',
                                                        staff_id:1,
                                                        createdAt: '2020-07-02 07:38:46',
                                                        
                                                        updatedAt: '2020-07-02 07:38:46'
                                                        },
                                                        {
                                                            id: 13,
                                                            name: 'Lozenges',
                                                            staff_id:1,
                                                            
                                                            createdAt: '2020-07-02 07:38:46',
                                                            updatedAt: '2020-07-02 07:38:46'
                                                            },{
                                                                id: 14,
                                                            
                                                                name: 'Bottles',
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