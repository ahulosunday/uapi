
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 317,
            name: 'TEST_PRESCRIPTION',
              description:"Can make a test prescription",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            
            {
                id: 318,
                name: 'TEST_PRESCRIPTION_RESULT',
                  description:"Can add a test result",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                  id: 319,
                  name: 'CAN_VIEW_PRESCRIPTION',
                    description:"Can view a test prescription",
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