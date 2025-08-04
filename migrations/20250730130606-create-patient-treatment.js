'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('patient_treatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      drug_id: {
        type: DataTypes.INTEGER
      },
      drug: {
        type: DataTypes.STRING
      },
      dosage_administered: {
        type: DataTypes.STRING
      },
      remarks: {
        type: DataTypes.STRING
      },
      date_entered: {
        type: DataTypes.DATE,
        allowNull: false

      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      admission_id: {
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
    await queryInterface.dropTable('patient_treatments');
  }
};