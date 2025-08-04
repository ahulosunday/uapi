'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      inventory_item_id:{
           type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      inventory_id: {
        type: DataTypes.INTEGER
      },
      item_id: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes. ENUM('Pending','Declined','Granted'),
        default: 'Pending'
      },
      requested_by: {
        type: DataTypes.STRING
      },
      processed_by: {
        type: DataTypes.STRING
      },
      date_processed: {
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
    await queryInterface.dropTable('requests');
  }
};