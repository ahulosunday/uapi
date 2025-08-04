'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('dependants', {
      dependant_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      date_of_birth: {
        type: DataTypes.DATE
      },
      relationship: {
        type: DataTypes.STRING
      },
      hospital_id: {
        type: DataTypes.INTEGER
      },
      gender: {
        type: DataTypes.STRING
      },
      photo: {
        type: DataTypes.STRING
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      patient_type: {
        type: DataTypes.STRING
      },
      admission_status: {
        type: DataTypes.STRING
      },
      insurance_id: {
        type: DataTypes.INTEGER
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      enrollee_id: {
        type: DataTypes.INTEGER
      },
      phone: {
        type: DataTypes.STRING
      },
      hospital_nhis_id: {
        type: DataTypes.STRING
      },
      plan: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      enrollee_code: {
        type: DataTypes.STRING
      },
      has_antenatal_account: {
        type: DataTypes.INTEGER
      },
      has_taken_immunization: {
        type: DataTypes.INTEGER
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      is_active: {
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
    await queryInterface.dropTable('dependants');
  }
};