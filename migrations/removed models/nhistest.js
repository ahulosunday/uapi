'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nhistest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nhistest.init({
    ntest_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    }, 
    name: DataTypes.STRING,
    lab_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    staff_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER,
    code: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nhistest',
  });
  return nhistest;
};