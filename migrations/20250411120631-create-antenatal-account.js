'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('antenatal_accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      antenatal_number: {
        type: DataTypes.STRING
      },
      parity: {
        type: DataTypes.STRING
      },
      gravida: {
        type: DataTypes.STRING
      },
      last_menses_period: {
        type: DataTypes.STRING
      },
      estimated_delivery_date: {
        type: DataTypes.DATE
      },
      estimated_concept_time: {
        type: DataTypes.DATE
      },
      fetal_age: {
        type: DataTypes.STRING
      },
      medical_history: {
        type: DataTypes.STRING
      },
      family_history: {
        type: DataTypes.STRING
      },
      blood_transfusion_history: {
        type: DataTypes.STRING
      },
      surgical_history: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      end_date: {
        type: DataTypes.DATE
      },
      account_status: {
        type: DataTypes.ENUM('ACTIVE','INACTIVE','COMPLETED','DISCONTINUED'),
        default:'ACTIVE'
      },
      for_whom: {
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
    await queryInterface.dropTable('antenatal_accounts');
  }
};