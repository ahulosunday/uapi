'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('gifshipPackages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      insurance_id:{
       type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.FLOAT
      },
      duration:{
      type: DataTypes.INTEGER,
    defaultValue:0,
      },
      userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'user',
        key: 'id',
        
      },
      
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      
      gifshipTypeId:   {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'gifshiptypes',
        key: 'id',
        
      },
      
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      gifshipId:{
        type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'gifships',
        key: 'id',
        
      },
      
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      },
      qty: {
        type: DataTypes.INTEGER,
        defaultValue:0,
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
    await queryInterface.dropTable('gifshipPackages');
  }
};