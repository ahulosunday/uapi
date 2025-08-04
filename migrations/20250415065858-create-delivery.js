'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('deliveries', {
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
      admission_id: {
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER
      },
      condition_of_mother: {
        type: DataTypes.STRING
      },
      condition_of_baby: {
        type: DataTypes.STRING
      },
      mode_of_delivery: {
        type: DataTypes.STRING
      },
      date_of_delivery: {
        type: DataTypes.DATE
      },
      time_surgery_ended: {
        type: DataTypes.DATE
      },
      blood_loss_quantity: {
        type: DataTypes.STRING
      },
      apgar_one_min: {
        type: DataTypes.STRING
      },
      apgar_five_min: {
        type: DataTypes.STRING
      },
      apgar_ten_min: {
        type: DataTypes.STRING
      },
      birth_weight: {
        type: DataTypes.STRING
      },
      sex: {
        type: DataTypes.STRING
      },
      vitaminA_IU: {
        type: DataTypes.STRING
      },
      nature_of_liquor: {
        type: DataTypes.STRING
      },
      nevirapine: {
        type: DataTypes.STRING
      },
      bcg: {
        type: DataTypes.STRING
      },
      opvo: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.STRING
      },
      hbv: {
        type: DataTypes.STRING
      },
      comments: {
        type: DataTypes.STRING
      },
      baby_immunization_date: {
        type: DataTypes.DATE
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
    await queryInterface.dropTable('deliveries');
  }
};