'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('allergies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      visit_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      allergen: {
        type: DataTypes.STRING
      },
      comment: {
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
    await queryInterface.dropTable('allergies');
  }
};