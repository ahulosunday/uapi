'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('investigation_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      prescribed_investigation_id: {
        type: DataTypes.INTEGER
      },
      result: {
        type: DataTypes.STRING
      },
      investigation_prescription_id: {
        type: DataTypes.STRING
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      date_created: {
        type: DataTypes.DATE
      },
      comments: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      status: {
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
    await queryInterface.dropTable('investigation_results');
  }
};