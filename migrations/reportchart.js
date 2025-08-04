'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('reportchart', {
      id: {
        allowNull: false,
        autoIncrement: false,
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
      entity_id: {
        type: DataTypes.INTEGER,
     
      validate:{
        notEmpty: true,
       
      }

      },
      acc_type_id:{
        type: DataTypes.INTEGER
      },
      credit:{ 
        type: DataTypes.REAL
      },
      debit: {  
        type: DataTypes.REAL
      },
      totalCredit:{ type: DataTypes.REAL,
        defaultValue: 0
      },
      totalDebit: {  type: DataTypes.REAL,
        defaultValue: 0
      },
    tdate: {
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
    await queryInterface.dropTable('reportchart');
  }
};