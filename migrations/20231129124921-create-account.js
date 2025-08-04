'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
              },
      acc_type_id: {
        type: DataTypes.INTEGER,
         allowNull:false,
       
      validate:{
        notEmpty: true,
       
      }
      },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
       
      validate:{
        notEmpty: true,
       
      }
      },
      sub: {
        type: DataTypes.INTEGER
      },
      table_name: {
        type: DataTypes.STRING
      },
      table_id: {
        type: DataTypes.INTEGER
      },
      acc_code: {
        type: DataTypes.STRING
      },
      d_created: {
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
    await queryInterface.dropTable('accounts');
  }
};
