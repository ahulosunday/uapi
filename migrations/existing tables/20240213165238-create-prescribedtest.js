'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribedtests', {
      pt_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      test_id: {
        type: DataTypes.INTEGER
      },
      ntest_id: {
        type: DataTypes.INTEGER
      },
      test_name: {
        type: DataTypes.STRING
      },
      examiner: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
      },
      lab_id: {
        type: DataTypes.INTEGER
      },
      lab_name: {
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
      date_requested: {
        type: DataTypes.DATE
      },
      payment_status: {
        type: DataTypes.STRING
      },
      is_test_result_finished: {
        type: DataTypes.INTEGER
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      is_nhis_test_approved: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      is_test_result_approved: {
        type: DataTypes.INTEGER
      },
      modifiedBy: {
        type: DataTypes.STRING
      },
      test_approved_date: {
        type: DataTypes.DATE
      },
      test_approved_by: {
        type: DataTypes.STRING
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
      comment: {
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
    await queryInterface.dropTable('prescribedtests');
  }
};