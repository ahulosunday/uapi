'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class antenatal_observation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient, visits, antenatal_account}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      // define association here
    }
  }
  antenatal_observation.init({
    patient_id: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    mother_condition: DataTypes.STRING,
    continuation_sheet: DataTypes.STRING,
    doctor_comments: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'antenatal_observation',
  });
  return antenatal_observation;
};