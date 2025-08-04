'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribed_investigations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      investigation_id: {
        type: DataTypes.INTEGER
      },
      imaging_id: {
        type: DataTypes.INTEGER
      },
      is_urgent: {
        type: DataTypes.STRING
      },
      investigation_type: {
        type: DataTypes.ENUM('Cash', 'NHIS', 'Retainership', 'Private')
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
      investigation_prescription_id: {
        type: DataTypes.INTEGER
      },
      date_requested: {
        type: DataTypes.DATE
      },
      payment_status: {
        type: DataTypes.ENUM('Cleared', 'Paid', 'Pending', 'Permitted')
      },
      billing_status: {
        type: DataTypes.ENUM('Billed', 'Unbilled')
      },
      result_id: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Imaging Taken','Result Added', 'Verified', 'Approved', 'Referred','Rejected')
      },
      investigation_verified_date: {
        type: DataTypes.DATE
      },
      investigation_approved_date: {
        type: DataTypes.DATE
      },
      investigation_verified_by: {
        type: DataTypes.INTEGER
      },
      investigation_approved_by: {
        type: DataTypes.INTEGER
      },
      nhis_status: {
        type: DataTypes.ENUM('Approved', 'Declined', 'Pending')
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
      investigation_changed_by: {
        type: DataTypes.STRING
      },
      investigation_group: {
        type: DataTypes.STRING
      },
      nhis_investigation_processed_by: {
        type: DataTypes.STRING
      },
      date_nhis_investigation_processed: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('prescribed_investigations');
  }
};