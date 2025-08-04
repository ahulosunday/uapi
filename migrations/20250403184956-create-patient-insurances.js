'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('patient_insurances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      insurance_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      gifshipId:{ type: DataTypes.INTEGER},
    gifshipTypeId: { type: DataTypes.INTEGER},
    gifshipPackageId:{ type: DataTypes.INTEGER},
      hmo_id: {
        type: DataTypes.INTEGER
      },
      is_default: {
        type: DataTypes.INTEGER
      },
      plan: {
        type: DataTypes.STRING
      },
      organization: {
        type: DataTypes.STRING
      },
      enrollee_code: {
        type: DataTypes.STRING
      },
      staff_id: {
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
    await queryInterface.dropTable('patient_insurances');
  }
};