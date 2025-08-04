'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class antenatal_triage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient,antenatal_account, visits}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      // define association here
    }
  }
  antenatal_triage.init({
    patient_id: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    height: DataTypes.STRING,
    body_mass_index: DataTypes.FLOAT,
    urinalysis_protein: DataTypes.STRING,
    urinalysis_glucose: DataTypes.STRING,
    pallor: DataTypes.STRING,
    blood_pressure: DataTypes.STRING,
    maturity: DataTypes.STRING,
    oedema: DataTypes.STRING,
    presentation: DataTypes.STRING,
    foetal_heart_rate: DataTypes.STRING,
    fundal_height: DataTypes.STRING,
    rvst: DataTypes.STRING,
    comments: DataTypes.STRING,
    next_appointment_date: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'antenatal_triage',
  });
  return antenatal_triage;
};