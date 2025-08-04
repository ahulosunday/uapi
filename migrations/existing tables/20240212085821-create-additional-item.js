'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('additional_item_prescriptions', {
      ai_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      
      drug_id: {
        type: DataTypes.INTEGER
      },
      ndrug_id: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      dependant_id: {
        type: DataTypes.INTEGER
      },
      theater_id: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      consultation_id: {
        type: DataTypes.INTEGER
      },
      date_prescribed: {
        type: DataTypes.DATE
      },
      unit_price: {
        type: DataTypes.FLOAT
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      payment_status: {
        type: DataTypes.STRING
      },
      admission_id: {
        type: DataTypes.INTEGER
      },
      is_dispensed: {
        type: DataTypes.INTEGER
      },
      prescribed_drug_id: {
        type: DataTypes.INTEGER
      },
      permittedby: {
        type: DataTypes.STRING
      },
      permitted_date: {
        type: DataTypes.DATE
      },
      dispense_status: {
        type: DataTypes.STRING
      },
      quantity_dispensed: {
        type: DataTypes.INTEGER
      },
      immunization_id: {
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
    await queryInterface.dropTable('additional_item_prescriptions');
  }
};