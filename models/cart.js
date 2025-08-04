'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init({
    tableid: DataTypes.INTEGER,
    tablename: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    patient_table: DataTypes.STRING,
    pid: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    qty:{
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};