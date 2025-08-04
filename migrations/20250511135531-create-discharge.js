'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('discharges', {
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
      admission_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      bed_id: {
        type: DataTypes.INTEGER
      },
      discharged_by: {
        type: DataTypes.INTEGER
      },
      discharge_type: {
        type: DataTypes.ENUM('Discharged','Death','Lama','Refer','Absconded','Transfer')
      },
      date_discharged: {
        type: DataTypes.DATE
      },
      conditions_of_patient: {
        type: DataTypes.TEXT
      },
      transfer_location: {
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
    await queryInterface.dropTable('discharges');
  }
};