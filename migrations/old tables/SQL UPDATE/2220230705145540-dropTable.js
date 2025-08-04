'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /*
      await queryInterface.dropTable('enrolee_rrr_codes');
       await queryInterface.dropTable('gforms');
      await queryInterface.dropTable('hmos');
     await queryInterface.dropTable('hospitals');
       await queryInterface.dropTable('role_permissions');
       await queryInterface.dropTable('permissions');
       await queryInterface.dropTable('roles');
       await queryInterface.dropTable('user_rrrs');
       await queryInterface.dropTable('wards');
       await queryInterface.dropTable('lgas');
       await queryInterface.dropTable('states');
       await queryInterface.dropTable('regions');
       await queryInterface.dropTable('countries');
       await queryInterface.dropTable('gifshipPackages');
       await queryInterface.dropTable('gifshiptypes');
       await queryInterface.dropTable('gifships');
       await queryInterface.dropTable('users');
       
       */
       await queryInterface.sequelize.query('DROP TABLE IF EXISTS enrolee_rrr_codes CASCADE');
           await queryInterface.sequelize.query('DROP TABLE IF EXISTS gforms CASCADE');
               //await queryInterface.sequelize.query('DROP TABLE IF EXISTS hmos CASCADE');
                   await queryInterface.sequelize.query('DROP TABLE IF EXISTS hospitals CASCADE');
                       await queryInterface.sequelize.query('DROP TABLE IF EXISTS role_permissions CASCADE');
                           await queryInterface.sequelize.query('DROP TABLE IF EXISTS permissions CASCADE');
                               await queryInterface.sequelize.query('DROP TABLE IF EXISTS roles CASCADE');
                                   await queryInterface.sequelize.query('DROP TABLE IF EXISTS user_rrrs CASCADE');
                                       await queryInterface.sequelize.query('DROP TABLE IF EXISTS councilwards CASCADE');
                                           await queryInterface.sequelize.query('DROP TABLE IF EXISTS lgas CASCADE');
                                               await queryInterface.sequelize.query('DROP TABLE IF EXISTS states CASCADE');
                                                   await queryInterface.sequelize.query('DROP TABLE IF EXISTS regions CASCADE');
                                                       await queryInterface.sequelize.query('DROP TABLE IF EXISTS countries CASCADE');
                                                           await queryInterface.sequelize.query('DROP TABLE IF EXISTS gifshipPackages CASCADE');
                                                               await queryInterface.sequelize.query('DROP TABLE IF EXISTS gifshiptypes CASCADE');
                                                                   await queryInterface.sequelize.query('DROP TABLE IF EXISTS gifships CASCADE');
                                                                       await queryInterface.sequelize.query('DROP TABLE IF EXISTS users CASCADE');
                                                                           
       //await queryInterface.sequelize.query('delete from sequelizemeta');
    
  },
  async down(queryInterface, DataTypes) {
   
      await queryInterface.dropTable('enrolee_rrr_codes');
       await queryInterface.dropTable('gforms');
        //  await queryInterface.dropTable('hmos');
     await queryInterface.dropTable('hospitals');
       await queryInterface.dropTable('role_permissions');
       await queryInterface.dropTable('permissions');
       await queryInterface.dropTable('roles');
       await queryInterface.dropTable('user_rrrs');
       await queryInterface.dropTable('councilwards');
       await queryInterface.dropTable('lgas');
       await queryInterface.dropTable('states');
       await queryInterface.dropTable('regions');
       await queryInterface.dropTable('countries');
       await queryInterface.dropTable('gifshipPackages');
       await queryInterface.dropTable('gifshiptypes');
       await queryInterface.dropTable('gifships');
       await queryInterface.dropTable('users');
      // await queryInterface.query('delete from sequelizemeta');
  }
};