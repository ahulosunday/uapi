'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('scalewides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      psection: {
        type: DataTypes.INTEGER,
        allowNull: false,
        

      },
      psdetail: {
        type: DataTypes.INTEGER,
        allowNull: false,
        

      },
      scale: {
        type: DataTypes.INTEGER,
        allowNull: false,
        

      },
      entityid: {
        type: DataTypes.INTEGER
      },
      amount: {
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
    await queryInterface.addIndex(
      'scalewides',
      [ 'psection', 'psdetail', 'scale'],
      {
        indicesType: 'UNIQUE',
         unique:true
        
        
       
      }
  );
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('scalewides');
  }
};