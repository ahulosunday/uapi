'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('refund', {
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
      narration: {
        type: DataTypes.STRING
      },
      tdate: {
        type: DataTypes.DATE
      },
      vdate: {
        type: DataTypes.DATE
      },
      amount: {
        type: DataTypes.FLOAT
      },
      uid: {
        type: DataTypes.INTEGER
      },
      bank: {
        type: DataTypes.STRING
      },
      batchno: {
        type: DataTypes.STRING
      },
      refid: {
        type: DataTypes.STRING
      },
      tablename: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      qty: {
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
    await queryInterface.dropTable('refund');
  }
};