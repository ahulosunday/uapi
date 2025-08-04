'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('beds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      bed_type: {
        type: DataTypes.STRING
      },
      code: {
        type: DataTypes.STRING,
        allowNull:false, 
        unique: true,
        validate:{
        notEmpty:{msg: 'code can not be empty'},
       

      }
      },
      status: {
        type: DataTypes.STRING,
        allowNull:false, 
        validate:{
        notEmpty:{msg: 'status can not be empty'},
       

      }
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      ward_id: {
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
    await queryInterface.dropTable('beds');
  }
};