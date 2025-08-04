'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('initialdeposit', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.FLOAT
      },
      paid: {
        type: DataTypes.INTEGER
      },
      date: {
        type: DataTypes.DATE
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      patient_type: {
        type: DataTypes.STRING
      },
      hospital_id: {
        type: DataTypes.STRING
      },
      editedby: {
        type: DataTypes.INTEGER
      },
      attendedby: {
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
    await queryInterface.dropTable('initialdeposit');
  }
};