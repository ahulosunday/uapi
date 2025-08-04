'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  service.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    staff_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};