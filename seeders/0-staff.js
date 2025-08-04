
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 217,
            name: 'ADD_STAFF',
              description:"Can add staff",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            
            {
              id: 218,
              name: 'EDIT_STAFF',
                description:"Can edit staff",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 219,
                name: 'VIEW_STAFF',
                  description:"Can view staff",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 220,
                    name: 'DELETE_STAFF',
                      description:"Can delete staff",
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