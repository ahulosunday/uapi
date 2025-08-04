'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      region: {
        type: DataTypes.INTEGER
      },
      title:{
        type: DataTypes.STRING,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      middlename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.ENUM('Male','Female','Other'),
        allowNull:false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alt_phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lga_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hospital_id: {
        type: DataTypes.STRING,
        
      },
      next_of_kin_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      next_of_kin_address: {
        type: DataTypes.STRING
      },
      next_of_kin_phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      next_of_kin_relationship: {
        type: DataTypes.STRING
      },
      occupation: {
        type: DataTypes.STRING
      },
      relationship_to_principal: {
        type: DataTypes.STRING
      },
      photo: {
        type: DataTypes.STRING
      },
      photo_url: {
        type: DataTypes.STRING
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
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
      staff_id: {
        type: DataTypes.INTEGER
      },
      has_insurance: {
        type: DataTypes.INTEGER
      },
      principal_id: {
        type: DataTypes.INTEGER
      },
      patient_type: {
        type: DataTypes.ENUM('Dependant','Patient'),
        default: 'Patient'
        
      },
      patient_status: {
        type: DataTypes.ENUM('Inpatient','Outpatient','Deceased'),
        default: 'Outpatient'
      },
      complete_name: {
        type: DataTypes.STRING
      },
       bloodtype: { type: DataTypes.STRING

       },
    rhfactor: {type: DataTypes.STRING},
    weight:{type: DataTypes.FLOAT },
    height: { type: DataTypes.FLOAT},
      admitted_days_in_year: {
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