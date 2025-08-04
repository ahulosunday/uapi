'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class physical_exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ patient, users, visits}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(visits, {foreignKey: 'visits_id'})
      // define association here
    }
  }
  physical_exam.init({
    appearance: DataTypes.STRING,
    heent: DataTypes.STRING,
    cardiavascular: DataTypes.STRING,
    respiration: DataTypes.STRING,
    gestrointestinal: DataTypes.STRING,
    gynecology: DataTypes.STRING,
    musculoskeleton: DataTypes.STRING,
    neurological: DataTypes.STRING,
    skin: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    visits_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'physical_exam',
  });
  return physical_exam;
};