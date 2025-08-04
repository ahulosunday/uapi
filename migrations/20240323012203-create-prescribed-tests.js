'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribed_tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      test_id: {
        type: DataTypes.INTEGER
      },
      approve_id: {
        type: DataTypes.INTEGER
      },
      sample_id: {
        type: DataTypes.INTEGER
      },
      test_prescription_id: {
        type: DataTypes.INTEGER
      },
      result_id: {
        type: DataTypes.INTEGER
      },
      is_urgent: {
        type: DataTypes.STRING
      },
      test_type: {
        type: DataTypes.STRING
      },
      requester: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      date_requested: {
        type: DataTypes.DATE
      },
      payment_status: {
        type: DataTypes.STRING
      },
      billing_status: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      result_status: {
        type: DataTypes.STRING
      },
      test_verified_date: {
        type: DataTypes.DATE
      },
      test_approved_date: {
        type: DataTypes.DATE
      },
      test_verified_by: {
        type: DataTypes.STRING
      },
      test_approved_by: {
        type: DataTypes.STRING
      },
      nhis_status: {
        type: DataTypes.STRING
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      surgery_id: {
        type: DataTypes.INTEGER
      },
      source: {
        type: DataTypes.STRING
      },
      auth_code: {
        type: DataTypes.STRING
      },
      patient_insurance_id: {
        type: DataTypes.INTEGER
      },
      test_group: {
        type: DataTypes.STRING
      },
      test_changed_by: {
        type: DataTypes.STRING
      },
      nhis_test_processed_by: {
        type: DataTypes.STRING
      },
      date_nhis_test_processed: {
        type: DataTypes.STRING
      },
      tester_id: {
        type: DataTypes.INTEGER
      },
      test_conducted_date: {
        type: DataTypes.DATE
      }
      ,
      permittedby: {
        type: DataTypes.STRING
      },
      permitted_date: {
        type: DataTypes.DATE
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
    await queryInterface.dropTable('prescribed_tests');
  }
};