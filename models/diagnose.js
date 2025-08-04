'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diagnose extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({visits, patient,users, icd10_disease, icpc2_diseases}) {
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(icd10_disease,{foreignKey: 'diagnosis_id'})
      this.belongsTo(icpc2_diseases,{foreignKey: 'diagnosis_id'})

      // define association here
    }
  }
  diagnose.init({
    diagnosis_id: DataTypes.INTEGER,
    certainty: DataTypes.STRING,
    notes: DataTypes.STRING,
    type: DataTypes.STRING,
    visit_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    patient_insurance_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diagnose',
  });
  return diagnose;
};