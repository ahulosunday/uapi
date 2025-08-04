'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('inventory_item_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      inventory_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      drug_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      quantity_received: {
        type: DataTypes.FLOAT
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      selling_price: {
        type: DataTypes.FLOAT
      },
      acquired_price: {
        type: DataTypes.FLOAT
      },
      expiration: {
        type: DataTypes.DATE
      },
      quantity_consumed: {
        type: DataTypes.INTEGER
      },
      dosage_form_id: {
        type: DataTypes.INTEGER,
        allowNull:false

      },
      measurement_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      strength_input: {
        type: DataTypes.STRING
      },
      quantity_remaining: {
        type: DataTypes.INTEGER
      },
      drug_form: {
        type: DataTypes.STRING
      },
      drug_type: {
        type: DataTypes.STRING
      },
      date_received: {
        type: DataTypes.DATE
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      vendor_id: {
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
    await queryInterface.dropTable('inventory_item_logs');
  }
};