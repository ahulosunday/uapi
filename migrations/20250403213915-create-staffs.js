'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      middlename: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      department: {
        type: DataTypes.STRING
      },
      date_of_birth: {
        type: DataTypes.DATE
      },
      gender: {
        type: DataTypes.STRING
      },
      photo: {
        type: DataTypes.STRING
      },
      photos: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      sub_role: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
        
      },
      address: {
        type: DataTypes.STRING
      },
      password: {
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
    await queryInterface.dropTable('staffs');
  }
};