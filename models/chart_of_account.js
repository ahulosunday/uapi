'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chart_of_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, chart_of_account , account_type}) {
    this.belongsTo(chart_of_account, {foreignKey: 'parendId', as: 'child'})
     this.hasMany(chart_of_account, {foreignKey: 'parendId', as: 'children'})
     this.belongsTo(account_type, { foreignKey: 'acc_type_id', as: 'account_type'})

      // define association here
    }
  }
  chart_of_account.init({
    accountCode:{
      type: DataTypes.STRING,
      unique: true,
      
    },
    lineCode: DataTypes.STRING,
    name:{
      type: DataTypes.STRING,
      unique: true
    },
    parendId: DataTypes.INTEGER,
    levelCode: DataTypes.STRING,
    isParent: DataTypes.STRING,
    inuse: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    acc_type_id: DataTypes.INTEGER,
    tdate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'chart_of_account',
    tableName: 'chart_of_account'
  });
  return chart_of_account;
};