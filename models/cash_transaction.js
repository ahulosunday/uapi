'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cash_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cash_transaction.init({
    bank_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    vdate: DataTypes.DATE,
    tdate: DataTypes.DATE,
    entity_id: DataTypes.INTEGER,
    jid: DataTypes.INTEGER,
    jid2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cash_transaction',
    tableName: 'cash_transaction'
  });
  return cash_transaction;
};