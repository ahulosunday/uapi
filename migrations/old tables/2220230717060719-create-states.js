'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{type:DataTypes.STRING,
    allowNull:false,
     unique: true,
    
    },
      code:{type:DataTypes.STRING,
    allowNull:false,
    
    },
      countryId: {type: DataTypes.INTEGER,
    allowNull:false,
      references:{
        model: 'countries',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
    
      regionId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'regions',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      
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
    await queryInterface.dropTable('states');
  }
};