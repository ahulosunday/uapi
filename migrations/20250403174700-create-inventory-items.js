'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('inventory_items', {
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
        type: DataTypes.FLOAT,
        allowNull:false
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      selling_price: {
        type: DataTypes.FLOAT,
        allowNull:false
      },
      acquired_price: {
        type: DataTypes.FLOAT,
        allowNull:false
      },
      expiration: {
        type: DataTypes.DATE,
        allowNull:false
      },
      quantity_consumed: {
        type: DataTypes.INTEGER,
        allowNull:false
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
        type: DataTypes.INTEGER,
        allowNull: false
      },
      drug_form: {
        type: DataTypes.STRING,
        allowNull:false
      },
      drug_type: {
        type: DataTypes.STRING,
        allowNull:false
      },
      drug_group:{
        type: DataTypes.STRING
      },
      date_received: {
        type: DataTypes.DATE,
        allowNull: false
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('inventory_items');
  }
};