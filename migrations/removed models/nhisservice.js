'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nhisservice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nhisservice.init({
    nservice_id:{
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    staff_id: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nhisservice',
  });
  return nhisservice;
};