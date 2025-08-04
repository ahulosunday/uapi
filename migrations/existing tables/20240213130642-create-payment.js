'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      bank: {
        type: DataTypes.STRING
      },
      transid: {
        type: DataTypes.STRING
      },
      tdate: {
        type: DataTypes.DATE
      },
      amount: {
        type: DataTypes.FLOAT
      },
      editedby: {
        type: DataTypes.INTEGER
      },
      vdate: {
        type: DataTypes.DATE
      },
      narration: {
        type: DataTypes.STRING
      },
      confirm: {
        type: DataTypes.INTEGER
      },
      service_id: {
        type: DataTypes.INTEGER
      },
      service_name: {
        type: DataTypes.STRING
      },
      jid1: {
        type: DataTypes.INTEGER
      },
      batch_no: {
        type: DataTypes.STRING
      },
      confirmed_by: {
        type: DataTypes.STRING
      },
      confirmed_id: {
        type: DataTypes.INTEGER
      },
      confirmed_date: {
        type: DataTypes.DATE
      },
      payment_type: {
        type: DataTypes.STRING
      },
      uid: {
        type: DataTypes.INTEGER
      },
      payment_id: {
        type: DataTypes.INTEGER
      },
      confirm_note: {
        type: DataTypes.STRING
      },
      isconfirm: {
        type: DataTypes.INTEGER
      },
      jid2: {
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
    await queryInterface.dropTable('payment');
  }
};