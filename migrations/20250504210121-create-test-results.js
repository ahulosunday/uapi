'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('test_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      prescribed_test_id: {
        type: DataTypes.INTEGER
      },
      result: {
        type: DataTypes.TEXT
      },
      test_prescription_id: {
        type: DataTypes.INTEGER
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
      is_abnormal: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM('Pending','Rejected','Accepted')
      },
      comments: {
        type: DataTypes.TEXT
      },
      institute_referred: {
        type: DataTypes.STRING
      },
      referral_reason: {
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
    await queryInterface.dropTable('test_results');
  }
};