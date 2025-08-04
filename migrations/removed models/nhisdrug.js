'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nhisdrug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nhisdrug.init({
    ndrug_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    dosage_form: DataTypes.STRING,
    strength: DataTypes.STRING,
    presentation: DataTypes.STRING,
    drug_type: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nhisdrug',
  });
  return nhisdrug;
};