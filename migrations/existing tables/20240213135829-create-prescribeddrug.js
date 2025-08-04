'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribeddrugs', {
      pd_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      drug_id: {
        type: DataTypes.INTEGER
      },
      drug_name: {
        type: DataTypes.STRING
      },
      starting_date: {
        type: DataTypes.DATE
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      quantity_to_dispense: {
        type: DataTypes.INTEGER
      },
      route: {
        type: DataTypes.INTEGER
      },
      frequency: {
        type: DataTypes.STRING
      },
      strength: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.STRING
      },
      notes: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.STRING
      },
      total_price: {
        type: DataTypes.STRING
      },
      is_dispensed: {
        type: DataTypes.INTEGER
      },
      examiner: {
        type: DataTypes.STRING
      },
      date_prescribed: {
        type: DataTypes.DATE
      },
      payment_status: {
        type: DataTypes.STRING
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      dependant_id: {
        type: DataTypes.INTEGER
      },
      consultation_id: {
        type: DataTypes.INTEGER
      },
      theater_id: {
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      ndrug_id: {
        type: DataTypes.INTEGER
      },
      extras: {
        type: DataTypes.STRING
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      avail_strength: {
        type: DataTypes.STRING
      },
      prescribed_strength: {
        type: DataTypes.STRING
      },
      duration_count: {
        type: DataTypes.STRING
      },
      dosage_form: {
        type: DataTypes.STRING
      },
      capitated_price: {
        type: DataTypes.FLOAT
      },
      is_nhis_drug_approved: {
        type: DataTypes.INTEGER
      },
      nhis_drug_type: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('prescribeddrugs');
  }
};