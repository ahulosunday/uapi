'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('return_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      inventory_id:{
type:DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      inventory_item_id: {
        type: DataTypes.INTEGER
      },
      drug_id:{
        type: DataTypes.INTEGER
      },
      pharmacy_item_id: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      date_received: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.STRING
      },
      reason_for_return: {
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
    await queryInterface.dropTable('return_items');
  }
};