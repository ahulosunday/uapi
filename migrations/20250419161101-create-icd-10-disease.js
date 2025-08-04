'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('icd10_diseases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      diagnosis: {
        type: DataTypes.STRING
      },
      code: {
        type: DataTypes.STRING
      },
      class_code: {
        type: DataTypes.STRING
      },
      sub_class_code: {
        type: DataTypes.STRING
      },
      is_active: {
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
    await queryInterface.dropTable('icd10_diseases');
  }
};