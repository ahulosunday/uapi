'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account_type.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notNull: true
      }
      }
  }, {
    sequelize,
    modelName: 'account_type',
  });
  return account_type;
};