
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 144,
            name: 'MAKE_UNBILLED',
              description:"Can make unbill",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            
            
        {
            id: 145,
            name: 'MAKE_INITIAL_DEPOSIT',
              description:"can initial deposit",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },

            
        {
            id: 146,
            name: 'MAKE_REFUND_EXCESS',
              description:"can make refund excess",
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