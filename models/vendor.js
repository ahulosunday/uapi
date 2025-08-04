'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
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
  vendor.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vendor',
  });
  return vendor;
};