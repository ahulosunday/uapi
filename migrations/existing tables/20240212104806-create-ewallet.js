'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ewallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customer_id: {
        type: DataTypes.INTEGER
      },
      namrration: {
        type: DataTypes.STRING
      },
      amt: {
        type: DataTypes.FLOAT
      },
      vdate: {
        type: DataTypes.DATE
      },
      tablename: {
        type: DataTypes.STRING
      },
      tableid: {
        type: DataTypes.INTEGER
      },
      uid: {
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
    await queryInterface.dropTable('ewallets');
  }
};