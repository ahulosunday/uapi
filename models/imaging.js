'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imaging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  imaging.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'imaging',
  });
  return imaging;
};