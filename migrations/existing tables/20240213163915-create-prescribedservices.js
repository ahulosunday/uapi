'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('prescribedservices', {
      ps_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id: {
        type: DataTypes.INTEGER
      },
      service_id: {
        type: DataTypes.INTEGER
      },
      nservice_id: {
        type: DataTypes.INTEGER
      },
      service_name: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT
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
      staff_id: {
        type: DataTypes.INTEGER
      },
      date_requested: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.INTEGER
      },
      hmo_id: {
        type: DataTypes.INTEGER
      },
      consultation_id: {
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      permittedby: {
        type: DataTypes.STRING
      },
      permitted_date: {
        type: DataTypes.DATE
      },
      theater_id: {
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
    await queryInterface.dropTable('prescribedservices');
  }
};