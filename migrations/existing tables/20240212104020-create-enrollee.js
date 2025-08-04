'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('enrollees', {
      enrollee_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
      name: {
        type: DataTypes.STRING
      },
      enrolleeId: {
        type: DataTypes.STRING
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      enrollee_type: {
        type: DataTypes.STRING
      },
      organization: {
        type: DataTypes.STRING
      },
      plan: {
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
    await queryInterface.dropTable('enrollees');
  }
};