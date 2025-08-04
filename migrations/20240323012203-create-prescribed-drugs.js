'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribed_drugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      drug_id: {
        type: DataTypes.INTEGER
      },
      dosage_form_id: {
        type: DataTypes.INTEGER
      },
      drug_type: {
        type: DataTypes.STRING
      },
      quantity_prescribed: {
        type: DataTypes.INTEGER
      },
      quantity_to_dispense: {
        type: DataTypes.STRING
      },
      quantity_dispensed: {
        type: DataTypes.STRING
      },
      quantity_returned: {
        type: DataTypes.INTEGER
      },
      route_id: {
        type: DataTypes.INTEGER
      },
      frequency: {
        type: DataTypes.STRING
      },
      strength_id: {
        type: DataTypes.INTEGER
      },
      duration: {
        type: DataTypes.INTEGER
      },
      notes: {
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
        type: DataTypes.STRING
      },
      prescribed_strength: {
        type: DataTypes.STRING
      },
      duration_unit: {
        type: DataTypes.STRING
      },
      nhis_status: {
        type: DataTypes.STRING
      },
      drug_group: {
        type: DataTypes.STRING
      },
      visit_id: {
        type: DataTypes.STRING
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      dispensed_by: {
        type: DataTypes.STRING
      },
      returned_by: {
        type: DataTypes.STRING
      },
      drug_prescription_id: {
        type: DataTypes.INTEGER
      },
      inventory_id: {
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
      immunization_id: {
        type: DataTypes.INTEGER
      },
      auth_code: {
        type: DataTypes.STRING
      },
      dosage_completed: {
        type: DataTypes.STRING
      },
      patient_insurance_id: {
        type: DataTypes.INTEGER
      },
      reason_for_return: {
        type: DataTypes.STRING
      },
      drug_changed_by: {
        type: DataTypes.STRING
      },
      nhis_drug_processed_by: {
        type: DataTypes.STRING
      },
      date_nhis_drug_processed: {
        type: DataTypes.STRING
      },
      date_dispensed: {
        type: DataTypes.DATE
      },
      date_returned: {
        type: DataTypes.DATE
      },
      original_total_price: {
        type: DataTypes.FLOAT
      }
      ,
      permittedby: {
        type: DataTypes.STRING
      },
      permitted_date: {
        type: DataTypes.DATE
      },
     pharmacy_id: {
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
    await queryInterface.dropTable('prescribed_drugs');
  }
};