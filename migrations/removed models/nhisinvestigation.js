'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nhisinvestigation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nhisinvestigation.init({
    ninvestigation_id:{
      type: DataTypes.INTEGER,
      primaryKey:true
    }, 
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    staff_id: DataTypes.INTEGER,
    imaging_id: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nhisinvestigation',
  });
  return nhisinvestigation;
};