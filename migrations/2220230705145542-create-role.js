'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
      type:  DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    }
/*
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'users',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      
    }
    */,
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
    await queryInterface.dropTable('roles');
  }
};