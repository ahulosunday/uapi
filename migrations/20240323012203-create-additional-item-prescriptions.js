'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('additional_item_prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      drug_id: {
        type: DataTypes.INTEGER
      },
      drug_type: {
        type: DataTypes.STRING
      },
      quantity_prescribed: {
        type: DataTypes.INTEGER
      },
      quantity_to_dispense: {
        type: DataTypes.INTEGER
      },
      quantity_returned: {
        type: DataTypes.INTEGER
      },
      quantity_dispensed: {
        type: DataTypes.INTEGER
      },
      drug_form: {
        type: DataTypes.STRING
      },
      total_price: {
        type: DataTypes.FLOAT
      },
      dispense_status: {
        type: DataTypes.STRING

      },
      payment_status: {
        type: DataTypes.STRING
      },
      billing_status: {
        type: DataTypes.STRING
      },
      examiner: {
        type: DataTypes.STRING
      },
      date_prescribed: {
        type: DataTypes.DATE
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      prescribed_drug_id: {
        type: DataTypes.INTEGER
      },
      patient_insurance_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      unit_id: {
        type: DataTypes.INTEGER
      },
      dispensed_by: {
        type: DataTypes.STRING
      },
      returned_by: {
        type: DataTypes.STRING
      },
      inventory_id: {
        type: DataTypes.INTEGER
      },
      drug_prescription_id: {
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      surgery_id: {
        type: DataTypes.INTEGER
      },
      source: {
        type: DataTypes.STRING
      },
      nhis_status: {
        type: DataTypes.STRING
      },
      
      reason_for_return: {
        type: DataTypes.STRING
      },
      permittedby: {
        type: DataTypes.STRING
      },
      permitted_date: {
        type: DataTypes.DATE
      },
      nhis_item_processed_by: {
        type: DataTypes.STRING
      },
      date_nhis_item_processed: {
        type: DataTypes.STRING
      },
      date_dispensed: {
        type: DataTypes.STRING
      },
      date_returned: {
        type: DataTypes.STRING
      },
      original_total_price: {
        type: DataTypes.FLOAT
      },
      pharmacy_id:{
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