'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pvheader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({chart_of_account, pv_detail, users}) {
      this.belongsTo(chart_of_account, {foreignKey: 'account_id'})
      this.belongsTo(users, {foreignKey: 'editedby'})
      this.hasMany(pv_detail, {foreignKey: 'pv_header_id'})
      // define association here
    }
  }
  pvheader.init({
    vdate: DataTypes.DATE,
    batchno: DataTypes.STRING,
    narration: DataTypes.STRING,
    payee: DataTypes.STRING,
    bulldate: DataTypes.DATE,
    voucherno: DataTypes.STRING,
    checkno: DataTypes.STRING,
    tdate: DataTypes.DATE,
    editedby: DataTypes.INTEGER,
    approvedby: DataTypes.INTEGER,
    approveddate: DataTypes.DATE,
    approved: DataTypes.INTEGER,
    vouchertype: DataTypes.STRING,
    account_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'pvheader',
  });
  return pvheader;
};