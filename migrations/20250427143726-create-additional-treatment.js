'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('additional_treatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      drug: {
        type: DataTypes.STRING
      },
       drug_id:{
        type: DataTypes.INTEGER
      },
      dosage_administered: {
        type: DataTypes.STRING
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      remarks: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      date_entered: {
        type: DataTypes.DATE
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      admission_id: {
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
    await queryInterface.dropTable('additional_treatments');
  }
};