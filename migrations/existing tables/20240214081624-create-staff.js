'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('staffs', {
      staff_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id:{
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      department: {
        type: DataTypes.STRING
      },
      date_of_birth: {
        type: DataTypes.DATE
      },
      id: {
        type: DataTypes.INTEGER
      },
      /*
      password_reset_token: {
        type: DataTypes.STRING
      },
      
      password_reset_expires: {
        type: DataTypes.DATE
      },
       fullname: {
        type: DataTypes.STRING
      },
      last_login_date: {
        type: DataTypes.STRING
      },
      
      */
      photo: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
     
      password: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      
      sub_role: {
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
    await queryInterface.dropTable('staffs');
  }
};