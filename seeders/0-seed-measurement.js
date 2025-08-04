
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 172,
            name: 'ADD_MEASUREMENT',
              description:"Can add MEASUREMENT",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            {
              id: 173,
              name: 'EDIT_MEASUREMENT',
                description:"Can edit MEASUREMENT",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 174,
                name: 'DELETE_MEASUREMENT',
                  description:"Can delete MEASUREMENT",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 175,
                    name: 'VIEW_MEASUREMENT',
                      description:"Can view MEASUREMENT",
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