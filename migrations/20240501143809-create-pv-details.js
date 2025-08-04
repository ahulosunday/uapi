'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pv_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      pv_header_id: {
        type: DataTypes.INTEGER
      },
      acc_code: {
        type: DataTypes.STRING
      },
      acc_number: {
        type: DataTypes.STRING
      },
      line_narration: {
        type: DataTypes.STRING
      },
      fund: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.FLOAT
      },
      tdate: {
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
    await queryInterface.dropTable('pv_details');
  }
};