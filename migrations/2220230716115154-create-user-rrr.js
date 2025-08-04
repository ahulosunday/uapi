'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_rrrs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      rrr_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

      },
      userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'user',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      
    },
      activated: {
        type: DataTypes.INTEGER
      },
      activatedby: {
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.FLOAT
      },
      duration:{
      type: DataTypes.INTEGER,
    defaultValue:0,
      },
      gifshipId:{
        type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      },
      references:{
        model: 'gifships',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
       gifshipTypeId: {
        type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      },
      references:{
        model: 'gifshiptypes',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
       gifshipPackageId: {
        type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      },
      references:{
        model: 'gifshipPackages',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',

      },
      activated_date:{
type:DataTypes.DATE,
allowNull: false,
defaultValue: DataTypes.DATE
      },
      expired_date:{
type:DataTypes.DATE,
allowNull: false,
defaultValue: DataTypes.DATE
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
    await queryInterface.dropTable('user_rrrs');
  }
};