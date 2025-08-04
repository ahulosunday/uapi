'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('employeepecifics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      employeeid: {
        type: DataTypes.INTEGER
      },
      psection: {
        type: DataTypes.INTEGER
      },
      psdetail: {
        type: DataTypes.INTEGER
      },
      amount:{
       type:DataTypes.FLOAT

      },
      entityid: DataTypes.INTEGER,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
    await queryInterface.addIndex(
      'employeepecifics',
      [ 'psection', 'psdetail', 'employeeid'],
      {
        indicesType: 'UNIQUE',
         unique:true
        
        
       
      }
  );

  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('employeepecifics');
  }
};