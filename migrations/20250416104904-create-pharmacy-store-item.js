'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pharmacy_store_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      drug_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      product_code: {
        type: DataTypes.STRING
      },
      shelf: {
        type: DataTypes.STRING
      },
      voucher: {
        type: DataTypes.STRING
      },
      batch: {
        type: DataTypes.STRING
      },
      quantity_received: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      quantity_remaining: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      unit_price: {
        type: DataTypes.FLOAT,
        allowNull:false
      },
      selling_price: {
        type: DataTypes.FLOAT,
        allowNull:false
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull:false
      },
      expiration: {
        type: DataTypes.DATE
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      date_received: {
        type: DataTypes.DATE,
        allowNull:false
      },
      drug_form: {
        type: DataTypes.ENUM('Drug','Consumable'),
        default: 'Drug',
        allowNull:false
      },
      drug_type: {
        type: DataTypes.ENUM('Cash','NHIS','Private','Retainership'),
        default: 'Cash',
        allowNull: false
      },
      drug_group:{
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      route_id: {
        type: DataTypes.INTEGER
      },
      strength_input: {
        type: DataTypes.STRING
      },
      measurement_id: {
        type: DataTypes.INTEGER
      },
      dosage_form_id: {
        type: DataTypes.INTEGER
      },
      brand: {
        type: DataTypes.STRING
      },
      vendor_id: {
        type: DataTypes.INTEGER
      },
      inventory_id: {
        type: DataTypes.INTEGER
      },
      inventory_item_id:{
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
    await queryInterface.dropTable('pharmacy_store_items');
  }
};