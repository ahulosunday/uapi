'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('previous_pregnancies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ante_natal_id: {
        type: DataTypes.INTEGER,
        allowNull: false

      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      year: {
        type: DataTypes.STRING,
        allowNull:false
      },
      delivery_place: {
        type: DataTypes.STRING,
        allowNull: false
      },
      maturity: {
        type: DataTypes.STRING,
        allowNull:false
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false
      },
      delivery_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sex: {
        type: DataTypes.STRING,
        allowNull:false
      },
      fate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      baby_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      puerperium: {
        type: DataTypes.STRING,
        allowNull:false
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date_added: {
        type: DataTypes.DATE
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
    await queryInterface.dropTable('previous_pregnancies');
  }
};