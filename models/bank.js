'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, chart_of_account}) {
      this.belongsTo(users, {foreignKey: 'entity_id'}) 
      this.belongsTo(chart_of_account, {foreignKey: 'chart_of_account_id'})
      // define association here
    }
  }
  bank.init({
    acc_name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
    },
    acc_number: DataTypes.STRING,
    acc_type: DataTypes.STRING,
    bank: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    tdate: DataTypes.DATE,
    chart_of_account_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bank',
    tableName: 'bank'
  });
  return bank;
};