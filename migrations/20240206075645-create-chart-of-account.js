'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('chart_of_account', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      accountCode: {
        type: DataTypes.STRING
      },
      lineCode: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      parendId: {
        type: DataTypes.INTEGER
      },
      levelCode: {
        type: DataTypes.STRING
      },
      isParent: {
        type: DataTypes.STRING
      },
      inuse: {
        type: DataTypes.STRING
      },
      entity_id: {
        type: DataTypes.INTEGER,
     
      validate:{
        notEmpty: true,
       
      }

      },
      acc_type_id:{
        type: DataTypes.INTEGER
      },
    tdate: {
      type: DataTypes.DATE
    },
      createdAt: {
        defaultValue: new Date(),
        type: DataTypes.DATE
      },
      updatedAt: {
        defaultValue: new Date(),
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('chart_of_account');
  }
};