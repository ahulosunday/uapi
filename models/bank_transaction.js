'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({journal}) {
      this.belongsTo(journal, {foreignKey: 'jid'})
      this.belongsTo(journal, {foreignKey: 'jid2'})
      // define association here
    }
  }
  //bank_id, description, ampunt, vdate, tdate, entity_id, jid, jid2
  bank_transaction.init({
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
    modelName: 'bank_transaction',
    tableName: 'bank_transaction'
  });
  return bank_transaction;
};