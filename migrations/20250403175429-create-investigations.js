'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('investigations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
      },
      nhis_price: {
        type: DataTypes.FLOAT
      },
      phis_price: {
        type: DataTypes.FLOAT
      },
      is_available_for_nhis: {
        type: DataTypes.INTEGER
      },
      is_available_for_phis: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      imaging_id: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      retainership_price: {
        type: DataTypes.FLOAT
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
    await queryInterface.dropTable('investigations');
  }
};