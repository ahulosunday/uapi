
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  async up (queryInterface, sequelize) {
    /*
    await queryInterface.sequelize.query(`insert into icd10_diseases SELECT * FROM svsh_prod.icd10_diseases`);
    await queryInterface.sequelize.query(`insert into icpc2_diseases SELECT * FROM svsh_prod.icpc2_diseases`);
    */
   
        
  },

  async down (queryInterface, sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
