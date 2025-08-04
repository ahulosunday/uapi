'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,country,lga,regions,hospital,gform }) {
      // define association here
     this.belongsTo(users, {foreignKey: 'userId'});
     this.belongsTo(country, {foreignKey: 'countryId'})
     this.belongsTo(regions, {foreignKey: 'regionId'})
     //this.hasMany(lga,{foreignKey: 'stateId'})
     //this.hasMany(hospital,{foreignKey: 'stateId'})
     //this.hasMany(gform, { foreignKey: 'stateOrigin'})
    }
  }
  states.init({
    name: {type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty: true,
      notNull: true
    }
    
    },
    code: {type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty: true,
      notNull: true
    }
    
    },
    countryId:{type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notEmpty: true,
      notNull: true
    
    }
    },
    regionId:{type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notEmpty: true,
      notNull: true
      
    }
    },
    userId:{type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notEmpty: true,
      notNull: true
      
    }
    },
  }, {
    sequelize,
    modelName: 'states',
  });
  return states;
};