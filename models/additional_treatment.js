'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class additional_treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient, visits, admission}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(admission, {foreignKey: 'admission_id'})
      // define association here
    }
  }
  additional_treatment.init({
    drug: DataTypes.STRING,
    drug_id: DataTypes.INTEGER,
    dosage_administered: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    date_entered: DataTypes.DATE,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'additional_treatment',
  });
  return additional_treatment;
};