'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      hospitalCode: {
        type: DataTypes.STRING,
        allowNull: false,
         unique:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
         unique: true,
      
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      email: {
        type: DataTypes.STRING,
        allowNull:false
      },
      contactAddress: {
        type: DataTypes.STRING,
        allowNull:false,
        
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull:false,
         references:{
        model: 'countries',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull:false,
         references:{
        model: 'regions',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull:false,
         references:{
        model: 'states',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
      lgaId: {
        type: DataTypes.INTEGER,
        allowNull:false,
         references:{
        model: 'lgas',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
         references:{
        model: 'user',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
      councilwardId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'councilwards',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
     
    },
    bank: {
      type:DataTypes.STRING,
      allowNull: false,
    
     
    },
    accnumber: {
      type:DataTypes.STRING,
      allowNull: false,
     
    },
    sortCode: {
      type:DataTypes.STRING,
      allowNull: false,
     
    },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    
    });
   
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('hospitals');
  }
};