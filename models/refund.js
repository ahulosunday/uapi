'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient, outpts}) {
      this.belongsTo(users,{foreignKey: 'uid'});
      this.belongsTo(patient,{foreignKey: 'refid'});
      this.belongsTo(outpts, {foreignKey: 'refid'})
      // define association here
    }
  }
  refund.init({ 
    pid: {type: DataTypes.INTEGER, primaryKey:true},
    narration: DataTypes.STRING,
    tdate: DataTypes.DATE,
    vdate: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    uid: DataTypes.INTEGER,
    bank: DataTypes.STRING,
    pmode: DataTypes.STRING,
    batchno: DataTypes.STRING,
    refid: DataTypes.STRING,
    tablename: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'refund',
    tableName: 'refund'
  });
  return refund;
};