'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class icd10_disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  icd10_disease.init({
    diagnosis: DataTypes.STRING,
    code: DataTypes.STRING,
    class_code: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    sub_class_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'icd10_disease',
  });
  return icd10_disease;
};