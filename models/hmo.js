'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hmo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,country, states, regions, lga, councilward, insurance, gifship, gifshipPackage, gifshiptype}) {
      // define association here
    //  this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(country, {foreignKey: 'countryId'})
      this.belongsTo(regions, {foreignKey: 'regionId'})
      this.belongsTo(states, {foreignKey: 'stateId'})
      this.belongsTo(lga, {foreignKey: 'lgaId'})
      this.belongsTo(councilward, {foreignKey: 'councilwardId'})
      this.belongsTo(insurance, {foreignKey: 'insurance_id'})
      this.belongsTo(gifship, {foreignKey: 'gifshipId'})
      this.belongsTo(gifshipPackage, {foreignKey: 'gifshipPackageId'})
      this.belongsTo(gifshiptype, {foreignKey: 'gifshipTypeId'})
    }
  }
  hmo.init({
    /*  hmo_id: {
      type: DataTypes.INTEGER, // Use the appropriate data type for your custom primary key
      primaryKey: true, // Mark this field as the primary key
    },
    */
    name:{ 
      type: DataTypes.STRING,
      allowNull: false,
   unique: true,
      validate:{
        notEmpty: true,
        notNull: true,
      }

    },
    hmo_num: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    councilwardId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
      notEmpty:true,
        notNull:true
      },
      references:{
        model: 'councilwards',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    
    },
    gifshipId:{
      type: DataTypes.INTEGER
    },
    gifshipTypeId:{
      type: DataTypes.INTEGER
    },
    gifshipPackageId:{
type:DataTypes.INTEGER
    },
     
  }, {
    sequelize,
    modelName: 'hmo',
  });
  //hmo.removeAttribute('id')
  return hmo;
};