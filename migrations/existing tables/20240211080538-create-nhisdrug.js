'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('nhisdrugs', {
      ndrug_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    
      name: {
        type: DataTypes.STRING
      },
      code: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT
      },
      dosage_form: {
        type: DataTypes.STRING
      },
      strength: {
        type: DataTypes.STRING
      },
      presentation: {
        type: DataTypes.STRING
      },
      drug_type: {
        type: DataTypes.STRING
      },
      type: {
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
    await queryInterface.dropTable('nhisdrugs');
  }
};