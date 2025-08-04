'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('outpts', {
      outpt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
         type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      tdate: {
        type: DataTypes.DATE
      },
      addedby: {
        type: DataTypes.STRING
      },
      email: {
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
    await queryInterface.dropTable('outpts');
  }
};