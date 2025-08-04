
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

            {
                id: 224,
              name: 'ADD_ANTE_TRIAGE',
                description:"Can add antenatal triage",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },{
              id: 221,
              name: 'EDIT_ANTE_TRIAGE',
                description:"Can edit antenatal triage",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 222,
                name: 'DELETE_ANTE_TRIAGE',
                  description:"Can delete antenatal triage",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },
                {
                    id: 223,
                    name: 'VIEW_ANTE_TRIAGE',
                      description:"Can view antenal triage",
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