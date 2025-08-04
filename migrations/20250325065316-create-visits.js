'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('visits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      date_visit_ended: {
        type: DataTypes.STRING
      },
      time_visit: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      date_visit_start: {
        type: DataTypes.STRING
      },
      department: {
        type: DataTypes.STRING
      },
      professional: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      ante_natal_id: {
        type: DataTypes.STRING
      },
      admission_id: {
        type: DataTypes.STRING
      },
      service_id: {
        type: DataTypes.INTEGER
      },
      vtype: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.FLOAT
      },
      has_done_vitals: {
        type: DataTypes.STRING
      },
      is_taken: {
        type: DataTypes.STRING
      },
      immunization_id: {
        type: DataTypes.STRING
      },
      consultation_id: {
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
    await queryInterface.dropTable('visits');
  }
};