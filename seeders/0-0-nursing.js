
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('permissions', [

        {
            id: 334,
            name: 'NURSE',
              description:"Nursing page",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            
            
        {
            id: 335,
            name: 'ADDMISSION',
              description:"Admission page",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },

            
        {
            id: 336,
            name: 'DISCHARGED',
              description:"Discharge page",
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