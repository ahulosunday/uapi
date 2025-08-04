'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stepwides', {
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
      level:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      steps:{
type: DataTypes.INTEGER,
allowNull: false
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
      'stepwides',
      [ 'psection', 'psdetail', 'scale', 'level', 'steps'],
      {
        indicesType: 'UNIQUE',
         unique:true
        
        
       
      }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stepwides');
  }
};