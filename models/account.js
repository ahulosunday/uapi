'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, account_type}) {
     
     this.belongsTo(users, {foreignKey: 'entity_id'});
     this.belongsTo(account_type, {foreignKey: 'acc_type_id'});
     
    }
  }
  account.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      },
    acc_type_id: DataTypes.INTEGER,
    entity_id: DataTypes.INTEGER,
    sub: DataTypes.INTEGER,
    table_name: DataTypes.STRING,
    table_id: DataTypes.INTEGER,
    acc_code: DataTypes.STRING,
    d_created: DataTypes.DATE
  }, {
    sequelize,
    //freezeTableName: true,
    modelName: 'account'
  });
  return account;
};