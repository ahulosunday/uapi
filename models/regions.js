'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class regions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, country, states, hospital, gform}) {
      // define association 
      this.belongsTo(users,{foreignKey: 'userId'});
      this.belongsTo(country,{foreignKey: 'countryId'})
      //this.hasMany(states, { foreignKey: 'regionId'})
      //this.hasMany(hospital,{foreignKey: 'regionId'})
      //this.hasMany(gform, { foreignKey: 'regionOrigin'})
      
    }
  }
  regions.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true,
        notNull: true,
     
      
      }

    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
     isInt:true
        
      }

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
       notNull: true,
     isInt:true
      }

    },
  }, {
    sequelize,
    modelName: 'regions',
  });
  return regions;
};