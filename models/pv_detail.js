'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pv_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({pvheader, chart_of_account}) {
      this.belongsTo(pvheader,{foreignKey: 'pv_header_id'})
      this.belongsTo(chart_of_account, {foreignKey: 'acc_code'})
      // define association here
    }
  }
  pv_detail.init({
    pv_header_id: DataTypes.INTEGER,
    acc_code: DataTypes.STRING,
    acc_number: DataTypes.STRING,
    line_narration: DataTypes.STRING,
    fund: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    tdate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'pv_detail',
  });
  return pv_detail;
};