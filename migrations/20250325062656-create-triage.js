'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('triages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      visit_id: {
        type: DataTypes.INTEGER,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      weight: {
        type: DataTypes.FLOAT,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      height: {
        type: DataTypes.FLOAT,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      bmi: {
        type: DataTypes.STRING,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      rvs: {
        type: DataTypes.STRING
      },
      pulse: {
        type: DataTypes.FLOAT,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      respiration: {
        type: DataTypes.STRING,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      temperature: {
        type: DataTypes.STRING,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      systolic: {
        type: DataTypes.STRING,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      diastolic: {
        type: DataTypes.STRING,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      heart_rate: {
        type: DataTypes.STRING,
        validate: {
          isNull: true,   
          notEmpty: true,
        }
      },
      spo2: {
        type: DataTypes.STRING
      },
      muac: {
        type: DataTypes.STRING
      },
      staff_id: {
        type: DataTypes.INTEGER
      },
      arrival_time: {
      type:  DataTypes.STRING,
      validate: {
        isNull: true,   
        notEmpty: true,
      }
      },
    mode_of_arrival:{
     type: DataTypes.STRING,
     validate: {
      isNull: true,   
      notEmpty: true,
    }
    } ,
    comment:{
      type:DataTypes.STRING
    } 
    ,
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
    await queryInterface.dropTable('triages');
  }
};