'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discharge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, ward, admission, visits,users,bed}) {
      this.belongsTo(users, {foreignKey:'discharged_by'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(ward, {foreignKey: 'ward_id'})
      this.belongsTo(admission, {foreignKey: 'admission_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(bed,{foreignKey: 'bed_id'})
      // define association here
    }
  }
  discharge.init({
    patient_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    bed_id: DataTypes.INTEGER,
    discharged_by: DataTypes.INTEGER,
    discharge_type: DataTypes.STRING,
    date_discharged: DataTypes.DATE,
    conditions_of_patient: DataTypes.STRING,
    transfer_location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'discharge',
  });
  return discharge;
};