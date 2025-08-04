'use strict';
/** @type {import('DataTable-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTable) {
    await queryInterface.createTable('info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTable.INTEGER
      },
      name: {
        type: DataTable.STRING
      },
      address: {
        type: DataTable.STRING
      },
      phone: {
        type: DataTable.STRING
      },
      email: {
        type: DataTable.STRING
      },
      web: {
        type: DataTable.STRING
      },
      smsapi: {
        type: DataTable.STRING
      },
      smsusername: {
        type: DataTable.STRING
      },
      smspassword: {
        type: DataTable.STRING
      },
      logo: {
        type: DataTable.STRING
      },
      last_update_date: {
        type: DataTable.STRING
      },
      short_name: {
        type: DataTable.STRING
      },
      watermark: {
        type: DataTable.STRING
      },
      token: {
        type: DataTable.STRING
      },
      senderid: {
        type: DataTable.STRING
      },
      emailpass: {
        type: DataTable.STRING
      },
      emailhost: {
        type: DataTable.STRING
      },
      emaildefault: {
        type: DataTable.STRING
      },
      port: {
        type: DataTable.STRING
      },
      email_img: {
        type: DataTable.STRING
      },
      http: {
        type: DataTable.STRING
      },
      img_path: {
        type: DataTable.STRING
      },
      banner: {
        type: DataTable.STRING
      },
      emailname: {
        type: DataTable.STRING
      },
      descr: {
        type: DataTable.STRING
      },
      ssl: {
        type: DataTable.STRING
      },
      wallet_ccount_id: {
        type: DataTable.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTable.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTable.DATE
      }
    });
  },
  async down(queryInterface, DataTable) {
    await queryInterface.dropTable('info');
  }
};