'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('hmoplans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      insurance_id: {
        type: DataTypes.INTEGER
      },
      gifshipId: {
        type: DataTypes.INTEGER
      },
      gifshipTypeId: {
        type: DataTypes.INTEGER
      },
      gifshipPackageId: {
        type: DataTypes.INTEGER
      },
      hmo_id:{
       type: DataTypes.INTEGER
      },
      plan: {
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
    await queryInterface.dropTable('hmoplans');
  }
};