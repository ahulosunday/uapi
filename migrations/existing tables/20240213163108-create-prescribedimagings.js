'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribedimagings', {
      pi_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      imaging_id: {
        type: DataTypes.INTEGER
      },
      imaging_name: {
        type: DataTypes.STRING
      },
      investigation_id: {
        type: DataTypes.INTEGER
      },
      investigation_name: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
      },
      date_requested: {
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
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      theater_id: {
        type: DataTypes.INTEGER
      },
      ninvestigation_id: {
        type: DataTypes.INTEGER
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      examiner: {
        type: DataTypes.STRING
      },
      is_nhis_investigation_approved: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      is_imaging_result_finished: {
        type: DataTypes.INTEGER
      },
      patient_name: {
        type: DataTypes.STRING
      },
      permittedby: {
        type: DataTypes.STRING
      },
      permitted_date: {
        type: DataTypes.DATE
      },
      comments: {
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
    await queryInterface.dropTable('prescribedimagings');
  }
};