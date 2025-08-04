'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('physical_exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      appearance: {
        type: DataTypes.STRING
      },
      heent: {
        type: DataTypes.STRING
      },
      cardiavascular: {
        type: DataTypes.STRING
      },
      respiration: {
        type: DataTypes.STRING
      },
      gestrointestinal: {
        type: DataTypes.STRING
      },
      gynecology: {
        type: DataTypes.STRING
      },
      musculoskeleton: {
        type: DataTypes.STRING
      },
      neurological: {
        type: DataTypes.STRING
      },
      skin: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      visits_id: {
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
    await queryInterface.dropTable('physical_exams');
  }
};