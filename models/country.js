'use strict';
const {
  Model
} = require('sequelize');
const users = require('./user')
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, states, lga, hospital, gform}) {
      // define association here
      this.belongsTo(users, {foreignKey: 'userId'});
      /*this.hasMany(states,{ foreignKey: 'countryId'})
      this.hasMany(lga,{ foreignKey: 'countryId'})
      this.hasMany(hospital,{foreignKey: 'countryId'})
      this.hasMany(gform, {foreignKey: 'countryOrigin'})
      */
      
    
    }
  }
  country.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notEmpty: {msg: 'Name can not empty'},
      notNull: true,
    
    }
    },
    code: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notEmpty: true,
      notNull: true,
     
    }
    },
    shortname:  {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notEmpty: true,
      notNull: true,
     
    }
    },
    currency:  {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notEmpty: true,
      notNull: true,
     
    }
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    }
  }, {
    sequelize,
    modelName: 'country',
  });

  return country;
};