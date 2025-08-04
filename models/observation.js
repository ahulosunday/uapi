'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class observation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({visits, patient, admission, users}) {
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(admission, {foreignKey: 'admission_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  observation.init({
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    bmi: DataTypes.FLOAT,
    rvs: DataTypes.STRING,
    pulse: DataTypes.FLOAT,
    respiration: DataTypes.STRING,
    temperature: DataTypes.FLOAT,
    systolic: DataTypes.STRING,
    diastolic: DataTypes.STRING,
    heart_rate: DataTypes.STRING,
    spo2: DataTypes.STRING,
    muac: DataTypes.STRING,
    comment: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    observation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'observation',
  });
  return observation;
};