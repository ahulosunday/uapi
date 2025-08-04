'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescribed_investigation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient,investigation, imaging, users,visits, patient_insurance, antenatal_account}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(investigation, {foreignKey: 'investigation_id'})
      this.belongsTo(imaging, {foreignKey: 'imaging_id'})
      this.belongsTo(users, {foreignKey: 'requester'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(patient_insurance, {foreignKey: 'patient_insurance_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      // define association here
    }
  }
  prescribed_investigation.init({
    investigation_id: DataTypes.INTEGER,
    imaging_id: DataTypes.INTEGER,
    is_urgent: DataTypes.STRING,
    investigation_type: DataTypes.STRING,
    requester: DataTypes.STRING,
    price: DataTypes.FLOAT,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    investigation_prescription_id: DataTypes.INTEGER,
    date_requested: DataTypes.DATE,
    payment_status: DataTypes.STRING,
    billing_status: DataTypes.STRING,
    result_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    investigation_verified_date: DataTypes.DATE,
    investigation_approved_date: DataTypes.DATE,
    investigation_verified_by: DataTypes.INTEGER,
    investigation_approved_by: DataTypes.INTEGER,
    nhis_status: DataTypes.STRING,
    ante_natal_id: DataTypes.INTEGER,
    surgery_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    auth_code: DataTypes.STRING,
    patient_insurance_id: DataTypes.INTEGER,
    investigation_changed_by: DataTypes.STRING,
    investigation_group: DataTypes.STRING,
    nhis_investigation_processed_by: DataTypes.STRING,
    date_nhis_investigation_processed: DataTypes.STRING,
    permittedby: DataTypes.STRING,
  permitted_date: DataTypes.DATE,
    //consultation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'prescribed_investigation',
  });
  return prescribed_investigation;
};