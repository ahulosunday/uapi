'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class triage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({visits, patient, users}) {
      this.belongsTo(visits, {foreignKey:'visit_id' })
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey : 'staff_id'})
      // define association here
    }
  }
  triage.init({
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    bmi: DataTypes.STRING,
    rvs: DataTypes.STRING,
    pulse: DataTypes.FLOAT,
    respiration: DataTypes.STRING,
    temperature: DataTypes.STRING,
    systolic: DataTypes.STRING,
    diastolic: DataTypes.STRING,
    heart_rate: DataTypes.STRING,
    spo2: DataTypes.STRING,
    muac: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    arrival_time: DataTypes.STRING,
    mode_of_arrival: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'triage',
  });
  return triage;
};