'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('inventory_item_logs', {
      ids: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id: {
        allowNull:false,
        type: DataTypes.INTEGER
      },
      inventory_id: {
        type: DataTypes.INTEGER,
      },
      drug_id: {
        type: DataTypes.INTEGER,
    
      },
      quantity_received: {
        type: DataTypes.FLOAT,
    
      },
      unit_id: {
        type: DataTypes.INTEGER,

      },
      selling_price: {
        type: DataTypes.FLOAT,
    
      },
      acquired_price: {
        type: DataTypes.FLOAT,
        
      },
      expiration: {
        type: DataTypes.DATE,
    
      },
      quantity_consumed: {
        type: DataTypes.INTEGER,
    
      },
      dosage_form_id: {
        type: DataTypes.INTEGER,
    

      },
      measurement_id: {
        type: DataTypes.INTEGER,
    
      },
      strength_input: {
        type: DataTypes.STRING
      },
      quantity_remaining: {
        type: DataTypes.INTEGER,
    
      },
      drug_form: {
        type: DataTypes.STRING,
    
      },
      drug_type: {
        type: DataTypes.STRING,
    
      },
      drug_group:{
        type: DataTypes.STRING
      },
      date_received: {
        type: DataTypes.DATE,
        
      },
      staff_id: {
        type: DataTypes.INTEGER,
    
      },
      brand: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
        
      },
      vendor_id: {
        type: DataTypes.INTEGER,
    
      },
      acquired_total: {
        type: DataTypes.FLOAT,
    
      },
      selling_total: {
        type: DataTypes.FLOAT,
    
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