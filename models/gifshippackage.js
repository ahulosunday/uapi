'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gifshipPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({gifship, users, gifshiptype, insurance }) {
      // define association here
      this.belongsTo(users, {foreignKey: 'userId'})
      this.belongsTo(gifship, {foreignKey: 'gifshipId'})
      this.belongsTo(gifshiptype, {foreignKey: 'gifshipTypeId'})
      this.belongsTo(insurance, {foreignKey: 'insurance_id'})
    }
  }
  gifshipPackage.init({
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    amount: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    gifshipTypeId: {
        type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      },
      insurance_id:{
type: DataTypes.INTEGER
      },
    qty:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      }
    ,
     maxNumber:{
      type: DataTypes.INTEGER,
      defaultValue: 0
      }
    ,
      gifshipId:{
        type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      },
      duration:{
      type: DataTypes.INTEGER,
    defaultValue:0,
      },
  },
  
   {
    sequelize,
    modelName: 'gifshipPackage',
  });
  return gifshipPackage;
};