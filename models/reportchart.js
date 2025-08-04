'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reportchart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({reportchart , account_type}) {
    this.belongsTo(reportchart, {foreignKey: 'parendId', as: 'child'})
     this.hasMany(reportchart, {foreignKey: 'parendId', as: 'children'})
     this.belongsTo(account_type, { foreignKey: 'acc_type_id', as: 'account_type'})

      // define association here
    }
  }
  reportchart.init({
    accountCode:{
      type: DataTypes.STRING,
      
    },
    lineCode: DataTypes.STRING,
    name:{
      type: DataTypes.STRING,
    },
   
    parendId: DataTypes.INTEGER,
    levelCode: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    acc_type_id: DataTypes.INTEGER,
    credit: DataTypes.REAL,
    debit: DataTypes.REAL,
    tdate: DataTypes.DATE,
    totalCredit:{ type: DataTypes.REAL},
    totalDebit: {  type: DataTypes.REAL},

  }, {
    sequelize,
    modelName: 'reportchart',
    tableName: 'reportchart'
  });
  return reportchart;
};