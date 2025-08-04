'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({country, states, users, regions, hospital,gform}) {
      // define association here
      this.belongsTo(states,{ foreignKey: 'stateId'})
      this.belongsTo(country,{ foreignKey: 'countryId'})
      this.belongsTo(users,{ foreignKey: 'userId'})
      this.belongsTo(regions,{ foreignKey: 'regionId'})
      //this.hasMany(hospital)
      //this.hasMany(gform, { foreignKey: 'lgaOrigin'})
      
    }
  }
  lga.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
       unique: true,
      validate:{
        notEmpty:true,
        notNull:true,
      }

    
    },
    code: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'LGA code is required',
        },
        notNull:{
          msg:'LGA code can not be Null'
        }
      }

    
    },
    countryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
       
        notNull: true
        
      }

    
    },
    regionId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true,
        notNull:true
      }

    
    },
    stateId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
      notEmpty:true,
        notNull:true
      }

    
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
       notEmpty:true,
        notNull: true
      }

    
    },
  }, {
    sequelize,
    modelName: 'lga',
  });
  return lga;
};