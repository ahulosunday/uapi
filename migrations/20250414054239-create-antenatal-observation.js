'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('antenatal_observations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      mother_condition: {
        type: DataTypes.STRING
      },
      continuation_sheet: {
        type: DataTypes.STRING
      },
      doctor_comments: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('antenatal_observations');
  }
};