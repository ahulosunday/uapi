'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, ward,bed, visits, users, antenatal_account, patient_insurance}) {
      this.belongsTo(patient,{foreignKey: 'patient_id'})
      this.belongsTo(ward, {foreignKey: 'ward_id'})
      this.belongsTo(bed, {foreignKey: 'bed_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(users,{foreignKey: 'admitted_by'})
      //this.belongsTo(users, {foreignKey: 'discharged_by'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      this.belongsTo(patient_insurance, {foreignKey: 'patient_insurance_id'})
      // define association here
    }
  }
  admission.init({
    patient_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    bed_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    admitted_by: DataTypes.INTEGER,
    discharge_status: DataTypes.STRING,
    previous_ward: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    should_discharge: DataTypes.INTEGER,
    discharge_recommended_by: DataTypes.INTEGER,
    discharged_by: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    date_admitted: DataTypes.DATE,
    patient_insurance_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admission',
  });
  return admission;
};