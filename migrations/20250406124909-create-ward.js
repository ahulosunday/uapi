'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('wards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false, 
        unique: true,
        validate:{
        notEmpty:{msg: 'name can not be empty'},
       

      }
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull:false, 
        
        validate:{
        notEmpty:{msg: 'service can not be empty'},
       

      }
      },
      occupant_type: {
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
    await queryInterface.dropTable('wards');
  }
};