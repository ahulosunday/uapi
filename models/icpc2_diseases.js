'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class icpc2_diseases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  icpc2_diseases.init({
    diagnosis: DataTypes.STRING,
    code: DataTypes.STRING,
    subcode: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'icpc2_diseases',
  });
  return icpc2_diseases;
};