'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        unique: true,
        allowNull:false,
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      code: {
        type: Sequelize.STRING
      },
      sample_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      result_unit: {
        type: Sequelize.STRING
      },
      valid_range: {
        type: Sequelize.STRING
      },
      staff_id: {
        type: Sequelize.INTEGER
      },
      nhis_price: {
        type: Sequelize.FLOAT
      },
      phis_price: {
        type: Sequelize.FLOAT
      },
      is_available_for_nhis: {
        type: Sequelize.FLOAT
      },
      is_available_for_phis: {
        type: Sequelize.INTEGER
      },
      retainership_price: {
        type: Sequelize.FLOAT
      },
      result_form: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tests');
  }
};