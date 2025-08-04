'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescribed_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, test, test_sample, visits, users}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(test, {foreignKey: 'test_id'})
      this.belongsTo(test_sample, {foreignKey: 'sample_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(users, {foreignKey: 'requester'})
      // define association here
    }
  }
  prescribed_test.init({
    approve_id: DataTypes.INTEGER,
    test_id: DataTypes.INTEGER,
    sample_id: DataTypes.INTEGER,
    test_prescription_id: DataTypes.INTEGER,
    result_id: DataTypes.INTEGER,
    is_urgent: DataTypes.STRING,
    test_type: DataTypes.STRING,
    requester: DataTypes.STRING,
    price: DataTypes.FLOAT,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    date_requested: DataTypes.DATE,
    payment_status: DataTypes.STRING,
    billing_status: DataTypes.STRING,
    status: DataTypes.STRING,
    result_status: DataTypes.STRING,
    test_verified_date: DataTypes.DATE,
    test_approved_date: DataTypes.DATE,
    test_verified_by: DataTypes.STRING,
    test_approved_by: DataTypes.STRING,
    nhis_status: DataTypes.STRING,
    ante_natal_id: DataTypes.INTEGER,
    surgery_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    auth_code: DataTypes.STRING,
    patient_insurance_id: DataTypes.INTEGER,
    test_group: DataTypes.STRING,
    test_changed_by: DataTypes.STRING,
    nhis_test_processed_by: DataTypes.STRING,
    date_nhis_test_processed: DataTypes.STRING,
    tester_id: DataTypes.INTEGER,
    test_conducted_date: DataTypes.DATE,
    permittedby: DataTypes.STRING,
    permitted_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'prescribed_test',
  });
  return prescribed_test;
};