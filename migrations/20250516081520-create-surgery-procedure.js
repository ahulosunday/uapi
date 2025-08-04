'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('surgery_procedures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      surgery_id: {
        type: DataTypes.INTEGER
      },
      procedure: {
        type: DataTypes.TEXT
      },
      findings: {
        type: DataTypes.TEXT
      },
      post_operation_order: {
        type: DataTypes.TEXT
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
    await queryInterface.dropTable('surgery_procedures');
  }
};