'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('admissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      ward_id: {
        type: DataTypes.INTEGER
      },
      bed_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      admitted_by: {
        type: DataTypes.INTEGER
      },
      discharge_status: {
        type: DataTypes.ENUM('Discharged','On Admission')
      },
      previous_ward: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.STRING
      },
      should_discharge: {
        type: DataTypes.INTEGER
      },
      discharge_recommended_by: {
        type: DataTypes.INTEGER
      },
      discharged_by: {
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      date_admitted: {
        type: DataTypes.DATE
      },
      patient_insurance_id: {
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
    await queryInterface.dropTable('admissions');
  }
};