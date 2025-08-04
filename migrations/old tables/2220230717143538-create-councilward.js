'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    
    await queryInterface.createTable('councilwards', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
      type:DataTypes.STRING,
      allowNull:false,
       unique: true,
      validate:{
        isEmpty:false,
        notNull:true,
      
      }

    
    },
      code:{
      type:DataTypes.STRING,
      allowNull:false,
       unique: true,
      validate:{
        isEmpty:false,
        notNull:true
      }

    
    },
      countryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isEmpty:false,
        notNull:true
      },
      references:{
        model: 'countries',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
      regionId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isEmpty:false,
        notNull:true
      },
      references:{
        model: 'regions',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',

    
    },
      stateId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isEmpty:false,
        notNull:true
      },
      references:{
        model: 'states',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',

    
    },
    lgaId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isEmpty:false,
        notNull:true
      },
      references:{
        model: 'lgas',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',

    
    },
      userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isEmpty:false,
        notNull:true
      },
      references:{
        model: 'user',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',

    
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
    await queryInterface.dropTable('councilwards');
  }
};