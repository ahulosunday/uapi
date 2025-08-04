'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dependant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({hmo, enrollee, patient}) {
      this.belongsTo(hmo, {foreignKey: 'hmo_id'})
      this.belongsTo(enrollee, { foreignKey: 'enrollee_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      // define association here
    }
  }
  dependant.init({
    dependant_id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    relationship: DataTypes.STRING,
    hospital_id: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    photo: DataTypes.STRING,
    patient_id: DataTypes.INTEGER,
    patient_type: DataTypes.STRING,
    admission_status: DataTypes.STRING,
    insurance_id: DataTypes.INTEGER,
    hmo_id: DataTypes.INTEGER,
    enrollee_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    hospital_nhis_id: DataTypes.STRING,
    plan: DataTypes.STRING,
    address: DataTypes.STRING,
    enrollee_code: DataTypes.STRING,
    has_antenatal_account: DataTypes.INTEGER,
    has_taken_immunization: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dependant',
  });
  return dependant;
};