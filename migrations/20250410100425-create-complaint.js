'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('complaints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      complaint: {
        type: DataTypes.TEXT
      },
      frequency: {
        type: DataTypes.ENUM('Minutes','Hours','Days','Weeks','Months','Years'),
        allowNull:false
      },
      notes: {
        type: DataTypes.STRING
      },
      frequency_number: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      patient_insurance_id: {
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
    await queryInterface.dropTable('complaints');
  }
};