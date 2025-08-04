'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('hmos', {
      hmo_id: {
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
        notNull: true,
      }

    },
      hmo_num:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }

    },
      staff_id: {
      type: DataTypes.INTEGER
    
      
      },
      insurance_id:{
        type: DataTypes.INTEGER
      },
      /*==============================================
      
      address: { 
        type: DataTypes.STRING,
        allowNull: false,
        
        validate:{
          notEmpty: true,
          notNull: true,
        }
  
      },
      phone: { 
        type: DataTypes.STRING,
        allowNull: false,
        
        validate:{
          notEmpty: true,
          notNull: true,
        }
  
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          notEmpty: true,
          notNull: true,
        }
  
      },
        types: { 
        type: DataTypes.INTEGER,
        allowNull: true
      },
          countryId: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
         
          notNull: true
          
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
          notEmpty:true,
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
        notEmpty:true,
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
        notEmpty:true,
          notNull:true
        },
        references:{
          model: 'lgas',
          key: 'id',
          
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
  
      
      },
      wardId: {
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
        notEmpty:true,
          notNull:true
        },
        references:{
          model: 'wards',
          key: 'id',
          
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      
      },
      */
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
    await queryInterface.dropTable('hmos');
  }
};