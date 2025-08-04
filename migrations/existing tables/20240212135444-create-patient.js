'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('patients', {
   
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      alt_phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      hospital_id: {
        type: DataTypes.STRING
      },
      occupation: {
        type: DataTypes.STRING
      },
      patient_type: {
        type: DataTypes.STRING
      },
      lga: {
        type: DataTypes.STRING
      },
      next_of_kin_name: {
        type: DataTypes.STRING
      },
      next_of_kin_address: {
        type: DataTypes.STRING
      },
      next_of_kin_phone: {
        type: DataTypes.STRING
      },
      relationship: {
        type: DataTypes.STRING
      },
      date_of_birth: {
        type: DataTypes.DATE
      },
      photo: {
        type: DataTypes.STRING
      },
      insurance_id: {
        type: DataTypes.INTEGER
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      enrollee_code: {
        type: DataTypes.STRING
      },
      card_type: {
        type: DataTypes.STRING
      },
      marital_status: {
        type: DataTypes.STRING
      },
      religion: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      hospital_nhis_id: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      enrollee_id: {
        type: DataTypes.INTEGER
      },
      old_patient_id: {
        type: DataTypes.STRING
      },
      admission_status: {
        type: DataTypes.STRING
      },
      fullname: {
        type: DataTypes.STRING
      },
      insurance: {
        type: DataTypes.STRING
      },
      number_of_family: {
        type: DataTypes.STRING
      },
      plan: {
        type: DataTypes.STRING
      },
      has_antenatal_account: {
        type: DataTypes.STRING
      },
      has_taken_immunization: {
        type: DataTypes.INTEGER
      },
      is_active: {
        type: DataTypes.STRING
      },
      patient_status: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('patients');
  }
};