
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

            {
                id: 301,
              name: 'ADD_CONSULTATION',
                description:"Can add consultation",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },{
              id: 302,
              name: 'EDIT_CONSULTATION',
                description:"Can edit consultation",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 303,
                name: 'DELETE_CONSULTATION',
                  description:"Can delete cnsultation",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 304,
                    name: 'VIEW_CONSULTATION',
                      description:"Can view consultation",
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