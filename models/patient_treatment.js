'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient_treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient, visits, admission}) {
     // this.belongsTo(drug, {foreignKey: 'drug_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(visits, { foreignKey: 'visit_id'})
      this.belongsTo(admission, {foreignKey: 'admission_id'})
      // define association here
    }
  }
  patient_treatment.init({
    drug_id: DataTypes.INTEGER,
    drug: DataTypes.STRING,
    dosage_administered: DataTypes.STRING,
    remarks: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    visit_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'patient_treatment',
  });
  return patient_treatment;
};