'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('mappings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      chartofaccount_id: {
        type: DataTypes.INTEGER,
       
      },
      mappingcode: {
        type: DataTypes.INTEGER
      },
      tablename: {
        type: DataTypes.STRING
      },
      userid: {
        type: DataTypes.INTEGER,
       
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('mappings');
  }
};