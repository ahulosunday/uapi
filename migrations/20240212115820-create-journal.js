'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('journal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      acc_id: {
        type: DataTypes.INTEGER
      },
      entity_id: {
        type: DataTypes.INTEGER
      },
      d_entry: {
        type: DataTypes.DATE
      },
      descr: {
        type: DataTypes.STRING
      },
      t_type: {
        type: DataTypes.STRING
      },
      amt: {
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
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('journal');
  }
};