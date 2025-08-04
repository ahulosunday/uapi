
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 320,
            name: 'CHECK_TEST_PAYMENT',
              description:"Can check test",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            
            {
              id: 321,
              name: 'APPROVE_TEST',
                description:"Can approve test",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 322,
                name: 'WRITE_TEST_RESULT',
                  description:"Can write test result",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 323,
                    name: 'APPROVE_TEST_RESULT',
                      description:"Can approve test result",
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