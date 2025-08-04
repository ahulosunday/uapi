'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, journal, drug, chart_of_account,  investigation, service, test, prescribed_drug, prescribed_test, prescribed_investigation, prescribed_service, additional_item_prescription}) {
      this.belongsTo(users, {foreignKey: 'editedby'})
      this.belongsTo(journal, {foreignKey: 'jid1'})
      this.belongsTo(journal, {foreignKey: 'jid2'})
      //this.belongsTo(bank, {foreignKey: 'bank'})
      //-------------------------------------------
      this.belongsTo(drug, {foreignKey: 'service_id'})
       this.belongsTo(investigation, {foreignKey: 'service_id'})
        this.belongsTo(service, {foreignKey: 'service_id'})
         this.belongsTo(test, {foreignKey: 'service_id'})
           this.belongsTo(chart_of_account, {foreignKey: 'service_id'})
      // define association here
      this.belongsTo(prescribed_drug, {foreignKey: 'payment_id'})
      this.belongsTo(prescribed_investigation, {foreignKey: 'payment_id'})
       this.belongsTo(prescribed_service, {foreignKey: 'payment_id'})
        this.belongsTo(prescribed_test, {foreignKey: 'payment_id'})
        this.belongsTo(additional_item_prescription, {foreignKey: 'payment_id'})
    }
  }
  payment.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    bank: DataTypes.STRING,
    transid: DataTypes.STRING,
    tdate: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    editedby: DataTypes.INTEGER,
    vdate: DataTypes.DATE,
    narration: DataTypes.STRING,
    confirm: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    service_name: DataTypes.STRING,
    jid1: DataTypes.INTEGER,
    batch_no: DataTypes.STRING,
    confirmed_by: DataTypes.STRING,
    confirmed_id: DataTypes.INTEGER,
    confirmed_date: DataTypes.DATE,
    payment_type: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,
    confirm_note: DataTypes.STRING,
    isconfirm: DataTypes.INTEGER,
    jid2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment',
    tableName: 'payment'
  });
  return payment;
};