'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeepecific extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, staff, pyrlpsdetail, pyrlsalary_item}) {
      // define association here
      this.belongsTo(users, {foreignKey: 'entityid'})
      this.belongsTo( pyrlsalary_item, {foreignKey: 'psection'})
      this.belongsTo( staff, {foreignKey: 'employeeid'})
      this.belongsTo( pyrlpsdetail, {foreignKey: 'psdetail'})
    }
  }
  employeepecific.init({
    employeeid: DataTypes.INTEGER,
    psection: DataTypes.INTEGER,
    psdetail: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    entityid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employeepecific',
  });
  return employeepecific;
};