'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tests', {
      test_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
      name: {
        type: DataTypes.STRING
      },
      lab_id: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      is_active: {
        type: DataTypes.INTEGER
      },
      code: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('tests');
  }
};