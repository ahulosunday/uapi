'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('regions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
      type: DataTypes.STRING,
      allowNull: false,
       unique: true,
      validate:{
        notEmpty: true,
        
      }

    },
      countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'countries',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
       
      }

    },
      userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
       
      }

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
    await queryInterface.dropTable('regions');
  }
};