'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({chart_of_account, users}) {
      this.belongsTo(chart_of_account, {foreignKey: 'acc_id'})
      this.belongsTo(users, {foreignKey: 'entity_id'})
      // define association here
    }
  }
  
  journal.init({
    acc_id: DataTypes.INTEGER,
    entity_id: DataTypes.INTEGER,
    d_entry: DataTypes.DATE,
    descr: DataTypes.STRING,
    t_type: DataTypes.STRING,
    amt: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'journal',
    tableName: 'journal'
  });
  return journal;
};