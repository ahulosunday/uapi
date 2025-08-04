'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('dosage_forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        unique: true,
        type: DataTypes.STRING,
        allowNull:false, 
        
        validate:{
        notEmpty:{msg: 'name can not be empty'},
       

      }
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
      validate:{
        isEmpty:false,
        notNull:true
      },
      references:{
        model: 'user',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
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
    await queryInterface.dropTable('dosage_forms');
  }
};