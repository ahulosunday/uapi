
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('imagings', [

        {
            id: 1,
            name: 'Scan',
            description:"Scanning",
            staff_id:1,
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            {
              id: 2,
              name: 'X-ray',
                description:"X-ray",
                staff_id:1,
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
                {
                    id: 3,
                    name: 'Cardiac Investigations',
                      description:"imaging for the cardiologist",
                      staff_id:1,
                    createdAt: '2020-07-02 07:38:46',
                    updatedAt: '2020-07-02 07:38:46'
                    },
                    {
                        id: 4,
                        name: 'Special Investigations',
                          description:"Specials ",
                          staff_id:1,
                        createdAt: '2020-07-02 07:38:46',
                        updatedAt: '2020-07-02 07:38:46'
                        },
                        {
                            id: 5,
                            name: 'Mammogram',
                              description:"Mammogram",
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