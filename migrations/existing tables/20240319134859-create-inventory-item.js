'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inventory_id: {
        type: Sequelize.INTEGER
      },
      drug_id: {
        type: Sequelize.INTEGER
      },
      quantity_received: {
        type: Sequelize.INTEGER
      },
      unit_id: {
        type: Sequelize.INTEGER
      },
      selling_price: {
        type: Sequelize.FLOAT
      },
      acquired_price: {
        type: Sequelize.FLOAT
      },
      expiration: {
        type: Sequelize.DATE
      },
      quantity_consumed: {
        type: Sequelize.INTEGER
      },
      dosage_form_id: {
        type: Sequelize.STRING
      },
      measurement_id: {
        type: Sequelize.STRING
      },
      strength_input: {
        type: Sequelize.STRING
      },
      quantity_remaining: {
        type: Sequelize.INTEGER
      },
      drug_form: {
        type: Sequelize.STRING
      },
      drug_type: {
        type: Sequelize.STRING
      },
      date_received: {
        type: Sequelize.DATE
      },
      staff_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('inventory_items');
  }
};