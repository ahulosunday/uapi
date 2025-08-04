
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 325,
            name: 'TAKE_INVESTIGATION',
              description:"Can add inv list",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            
            {
              id: 326,
              name: 'INVESTIGATION_RESULT',
                description:"Can give inv result",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 327,
                name: 'VIEW_APPROVE_INVESTIGATION',
                  description:"Can Approve investigation",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 328,
                    name: 'CHECK_INV_PAYMENT',
                      description:"Can check approve investigation",
                    createdAt: '2020-07-02 07:38:46',
                    updatedAt: '2020-07-02 07:38:46'
                    },
                    {
                        id: 329,
                        name: 'VIEW_INV_RESULT',
                          description:"Can view result investigation",
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