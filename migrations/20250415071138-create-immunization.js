'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('immunizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER
      },
      immunization_number: {
        type: DataTypes.STRING
      },
      mother_name: {
        type: DataTypes.STRING
      },
      place_of_birth: {
        type: DataTypes.STRING
      },
      father_name: {
        type: DataTypes.STRING
      },
      date_registered: {
        type: DataTypes.DATE
      },
      at_birth: {
        type: DataTypes.JSON
      },
      at_six_weeks: {
        type: DataTypes.JSON
      },
      at_ten_weeks: {
        type: DataTypes.JSON
      },
      at_fourteen_weeks: {
        type: DataTypes.JSON
      },
      at_six_months: {
        type: DataTypes.JSON
      },
      at_nine_months: {
        type: DataTypes.JSON
      },
      at_one_year: {
        type: DataTypes.JSON
      },
      at_fifteen_months: {
        type: DataTypes.JSON
      },
      at_two_years: {
        type: DataTypes.JSON
      },
      other_children: {
        type: DataTypes.JSON
      },
      is_wt_less_than_2_5kg: {
        type: DataTypes.STRING
      },
      is_baby_twin: {
        type: DataTypes.INTEGER
      },
      is_baby_bottle_fed: {
        type: DataTypes.INTEGER
      },
      does_family_need_support: {
        type: DataTypes.INTEGER
      },
      are_siblings_under_weight: {
        type: DataTypes.INTEGER
      },
      need_extra_care: {
        type: DataTypes.INTEGER
      },
      reason_for_extra_care: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.ENUM('ONGOING','COMPLETED','DISCONTINUED'),
        default:'ONGOING'
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
    await queryInterface.dropTable('immunizations');
  }
};