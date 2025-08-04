'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescribed_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, service, users, visits, antenatal_account, patient_insurance}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(service, {foreignKey: 'service_id'})
      this.belongsTo(users, {foreignKey: 'requester'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      this.belongsTo(patient_insurance, {foreignKey: 'patient_insurance_id'})
      // define association here
    }
  }
  prescribed_service.init({
    service_id: DataTypes.INTEGER,
    is_urgent:DataTypes.INTEGER,
    service_type: DataTypes.STRING,
    requester: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    date_requested: DataTypes.DATE,
    payment_status: DataTypes.STRING,
    billing_status: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    nhis_status:DataTypes.STRING,
    source: DataTypes.STRING,
    ante_natal_id: DataTypes.INTEGER,
    patient_insurance_id: DataTypes.STRING,
    surgery_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,  
    permittedby: DataTypes.STRING,
    permitted_date: DataTypes.DATE,
    service_group: DataTypes.STRING,
    service_changed_by: DataTypes.STRING,
    nhis_service_processed_by: DataTypes.STRING,
    date_nhis_service_processed: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'prescribed_service',
  });
  return prescribed_service;
};