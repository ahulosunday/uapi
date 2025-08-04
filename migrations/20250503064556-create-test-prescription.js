'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('test_prescriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      source: {
        type: DataTypes.STRING
      },
      requester: {
        type: DataTypes.STRING
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      date_requested: {
        type: DataTypes.DATE
      },
      date_sample_received: {
        type: DataTypes.DATE
      },
      is_billed: {
        type: DataTypes.INTEGER
      },
      has_paid: {
        type: DataTypes.INTEGER
      },
      accession_number: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      sample_received_by: {
        type: DataTypes.STRING
      },
      result_notes: {
        type: DataTypes.STRING
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      
    test_approved_date:{type: DataTypes.DATE},
    test_verified_date:{type: DataTypes.DATE},
    test_approved_by:{ type: DataTypes.INTEGER},
    test_verified_by: { type: DataTypes.INTEGER},
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
    await queryInterface.dropTable('test_prescriptions');
  }
};