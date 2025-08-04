'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patient_insurances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      insurance_id: {
        type: Sequelize.STRING
      },
      hmo_id: {
        type: Sequelize.STRING
      },
      is_default: {
        type: Sequelize.INTEGER
      },
      plan: {
        type: Sequelize.STRING
      },
      staff_id: {
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.STRING
      },
      organization: {
        type: Sequelize.STRING
      },
      enrollee_code: {
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
    await queryInterface.dropTable('patient_insurances');
  }
};