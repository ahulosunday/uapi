'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, country, regions, states, lga, gform, councilward}) {
     this.belongsTo(users, {foreignKey: 'userId'});
      this.belongsTo(country, {foreignKey: 'countryId'});
      this.belongsTo(regions, {foreignKey: 'regionId'});
      this.belongsTo(states, {foreignKey: 'stateId'});
      this.belongsTo(lga, {foreignKey: 'lgaId'});
      this.belongsTo(councilward, {foreignKey: 'councilwardId'});
      //this.hasMany(gform, { foreignKey: 'hospitalId'})
      // define association here
      
    }
  }
  hospital.init({
    hospitalCode: {
      type:DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    address: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    phone: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
      isEmail:true,
    
    }
     
    },
    contactAddress: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     
    }
     
    },
    countryId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    },
    regionId:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    },
    stateId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    },
    lgaId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    },
    councilwardId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    },
    bank: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    accnumber: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    sortCode: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
     
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
     
    }
  },
  {
      sequelize,
    modelName: 'hospital',
    
    
   
  });
  return hospital;
};