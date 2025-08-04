'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({test_sample, users}) {
      this.belongsTo(test_sample, {foreignKey: 'sample_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  test.init({
    name:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notNull: true,
      notEmpty: true,
      }
    },
    price: DataTypes.FLOAT,
    code: DataTypes.STRING,
    sample_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    result_unit: DataTypes.STRING,
    valid_range: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    nhis_price: DataTypes.FLOAT,
    phis_price: DataTypes.FLOAT,
    is_available_for_nhis: DataTypes.FLOAT,
    is_available_for_phis: DataTypes.INTEGER,
    retainership_price: DataTypes.FLOAT,
    result_form: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'test',
  });
  return test;
};