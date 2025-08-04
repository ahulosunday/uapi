'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('inventory_item_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      quantity_dispensed: {
        type: DataTypes.INTEGER
      },
      quantity_returned: {
        type: DataTypes.INTEGER
      },
      quantity_supplied: {
        type: DataTypes.INTEGER
      },
      quantity_remaining: {
        type: DataTypes.INTEGER
      },
      inventory_item_id: {
        type: DataTypes.INTEGER
      },
      inventory_id: {
        type: DataTypes.INTEGER
      },
      unit_id: {
        type: DataTypes.INTEGER
      },
      item_receiver: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      history_date: {
        type: DataTypes.INTEGER
      },
      history_type: {
        type: DataTypes.STRING
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      drug_prescription_id: {
        type: DataTypes.INTEGER
      },
      additional_item_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('inventory_item_histories');
  }
};