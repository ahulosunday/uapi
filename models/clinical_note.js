'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clinical_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, antenatal_account, visits, users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      // define association here
    }
  }
  clinical_note.init({
    patient_id: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'clinical_note',
  });
  return clinical_note;
};