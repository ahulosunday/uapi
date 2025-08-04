'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({visits, users, patient, antenatal_account}) {
      this.belongsTo(visits,{foreignKey:'visit_id'})
      this.belongsTo(users, {foreignKey: 'requester'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      
      //this.belongsTo(users, {foreignKey: 'sample_received_by'})
      // define association here
    }
  }
  test_prescription.init({
    source: DataTypes.STRING,
    requester: DataTypes.STRING,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    date_requested: DataTypes.DATE,
    date_sample_received: DataTypes.DATE,
    is_billed: DataTypes.INTEGER,
    has_paid: DataTypes.INTEGER,
    accession_number: DataTypes.STRING,
    status: DataTypes.STRING,
    sample_received_by: DataTypes.STRING,
    result_notes: DataTypes.STRING,
    ante_natal_id: DataTypes.INTEGER,
    test_approved_date: DataTypes.DATE,
    test_verified_date: DataTypes.DATE,
    test_approved_by: DataTypes.INTEGER,
    test_verified_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'test_prescription',
  });
  return test_prescription;
};