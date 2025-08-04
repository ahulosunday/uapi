'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribed_services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      service_id: {
        type: DataTypes.INTEGER
      },
      is_urgent: {
        type: DataTypes.STRING
      },
      service_type: {
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
      quantity: {
        type: DataTypes.INTEGER
      },
      nhis_status: {
        type: DataTypes.STRING
      },
      source: {
        type: DataTypes.STRING
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      patient_insurance_id: {
        type: DataTypes.INTEGER
      },
      surgery_id: {
        type: DataTypes.INTEGER
      },
      auth_code: {
        type: DataTypes.STRING
      },
      service_group: {
        type: DataTypes.STRING
      },
      service_changed_by: {
        type: DataTypes.STRING
      },
      nhis_service_processed_by: {
        type: DataTypes.STRING
      },
      date_nhis_service_processed: {
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
    await queryInterface.dropTable('prescribed_services');
  }
};