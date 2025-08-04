'use strict';

const { type } = require('os');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tableid: {
        type: DataTypes.INTEGER
      },
      tablename: {
        type: DataTypes.STRING
      },
      amount:{
type:DataTypes.FLOAT
      },
      pid: {
        type: DataTypes.INTEGER
      },
      patient_table: {
        type: DataTypes.STRING
      },
      service_id: {type: DataTypes.INTEGER
      },
      qty:{type: DataTypes.INTEGER,
        defaultValue: 1
      
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
    await queryInterface.dropTable('carts');
  }
};