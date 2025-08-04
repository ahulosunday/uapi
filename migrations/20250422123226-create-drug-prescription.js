'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('drug_prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      source: {
        type: DataTypes.ENUM('Antenatal','Consultation','Theater','Immunization'),
        default: 'Antenatal'

      },
      requester: {
        type: DataTypes.STRING
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      date_prescribed: {
        type: DataTypes.DATE
      },
      is_billed: {
        type: DataTypes.INTEGER
      },
      has_paid: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM('Pending','Complete Dispense','Partial Dispense')
      },
      ante_natal_id: {
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
    await queryInterface.dropTable('drug_prescriptions');
  }
};