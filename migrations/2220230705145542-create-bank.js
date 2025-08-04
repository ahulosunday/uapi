'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('bank', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      acc_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
    },
      acc_number: {
        type: DataTypes.STRING,
        unique: true
      },
      
      acc_type: {
        type: DataTypes.STRING
      },
      bank: {
        type: DataTypes.STRING
      },
      entity_id: {
        type: DataTypes.INTEGER,
  
      validate:{
        notEmpty: true,
       
      },
      
      },
      chart_of_account_id: {
        type: DataTypes.INTEGER,
        
      validate:{
        notEmpty: true,
       
      }
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
    await queryInterface.dropTable('bank');
  }
};