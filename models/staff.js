'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  staff.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    photo: DataTypes.STRING,
    photos: DataTypes.STRING,
    role: DataTypes.STRING,
    sub_role: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'staff',
  });
  return staff;
};