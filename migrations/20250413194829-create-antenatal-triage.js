'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('antenatal_triages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      weight: {
        type: DataTypes.STRING
      },
      height: {
        type: DataTypes.STRING
      },
      body_mass_index: {
        type: DataTypes.FLOAT
      },
      urinalysis_protein: {
        type: DataTypes.STRING
      },
      urinalysis_glucose: {
        type: DataTypes.STRING
      },
      pallor: {
        type: DataTypes.STRING
      },
      blood_pressure: {
        type: DataTypes.STRING
      },
      maturity: {
        type: DataTypes.STRING
      },
      oedema: {
        type: DataTypes.STRING
      },
      presentation: {
        type: DataTypes.STRING
      },
      foetal_heart_rate: {
        type: DataTypes.STRING
      },
      fundal_height: {
        type: DataTypes.STRING
      },
      rvst: {
        type: DataTypes.STRING
      },
      comments: {
        type: DataTypes.STRING
      },
      next_appointment_date: {
        type: DataTypes.STRING
      },
      staff_id: {
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
    await queryInterface.dropTable('antenatal_triages');
  }
};