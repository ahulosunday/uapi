'use strict';

const users = require('../models/user');


/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      uiid:{
      type: DataTypes.STRING,
      unique:true
    
      
      
    },
      username: {
        type: DataTypes.STRING,
        allowNull:false, 
        unique: true,
        validate:{
        notEmpty:{msg: 'Username can not be empty'},
       

      }
              },
      password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
        notEmpty:{msg: 'Password can not be empty'},
        

      }
        
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
        notEmpty:{
      
          msg: 'Email can not be empty'
          },
        isEmail: true,

      }

        
      },
      roleid: {
        type: DataTypes.INTEGER,
        allowNull:false,
        
        
        
      },
      imgurl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        surname:{
      type:  DataTypes.STRING,
      allowNull: false,
     }
     ,
      othername:{
      type:  DataTypes.STRING,
      allowNull: false,
     },
     
      phone:{
      type:  DataTypes.STRING,
      allowNull: false,
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
    await queryInterface.dropTable('user');
  }
};