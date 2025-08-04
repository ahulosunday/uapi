'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('observations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      admission_id: {
        type: DataTypes.INTEGER
      },
      weight: {
        type: DataTypes.FLOAT
      },
      height: {
        type: DataTypes.FLOAT
      },
      bmi: {
        type: DataTypes.FLOAT
      },
      rvs: {
        type: DataTypes.STRING
      },
      pulse: {
        type: DataTypes.FLOAT
      },
      respiration: {
        type: DataTypes.STRING
      },
      temperature: {
        type: DataTypes.FLOAT
      },
      systolic: {
        type: DataTypes.STRING
      },
      diastolic: {
        type: DataTypes.STRING
      },
      heart_rate: {
        type: DataTypes.STRING
      },
      spo2: {
        type: DataTypes.STRING
      },
      muac: {
        type: DataTypes.STRING
      },
      comment: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      observation:{ type: DataTypes.STRING },
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
    await queryInterface.dropTable('observations');
  }
};