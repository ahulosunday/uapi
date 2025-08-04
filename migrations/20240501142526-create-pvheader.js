'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pvheaders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      vdate: {
        type: DataTypes.DATE
      },
      batchno: {
        type: DataTypes.STRING
      },
      narration: {
        type: DataTypes.STRING
      },
      payee: {
        type: DataTypes.STRING
      },
      bulldate: {
        type: DataTypes.DATE
      },
      voucherno: {
        type: DataTypes.STRING
      },
      checkno: {
        type: DataTypes.STRING
      },
      tdate: {
        type: DataTypes.DATE
      },
      editedby: {
        type: DataTypes.INTEGER
      },
      approvedby: {
        type: DataTypes.INTEGER
      },
      approveddate: {
        type: DataTypes.DATE
      },
      approved: {
        type: DataTypes.INTEGER
      },
      vouchertype: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      account_id: {type: DataTypes.INTEGER},
    amount: {type: DataTypes.FLOAT},

    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('pvheaders');
  }
};