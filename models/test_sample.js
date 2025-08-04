'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  test_sample.init({
    name: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'test_sample',
  });
  return test_sample;
};