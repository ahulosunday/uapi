'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class antenatals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, dependant,hmo}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(hmo, {foreignKey: 'hmo_id'})
      // define association here
    }
  }
  antenatals.init({
    ante_natal_id:{
type:DataTypes.INTEGER,
primaryKey: true
    },
    occupation: DataTypes.STRING,
    ancId:DataTypes.STRING,
    gravida: DataTypes.STRING,
    parity: DataTypes.STRING,
    lmp:DataTypes.DATE,
    edd: DataTypes.DATE,
    ecc:DataTypes.DATE,
    fetal_age:DataTypes.STRING,
    medical_history: DataTypes.STRING,
    surgical_history: DataTypes.STRING,
    blood_transfusion: DataTypes.STRING,
    family_history: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    dependant_id: DataTypes.INTEGER,
    is_drugs_prescribed:DataTypes.INTEGER,
    antenatal_id: DataTypes.STRING,
    date_prescribed:DataTypes.DATE,
    is_test_prescribed: DataTypes.INTEGER,
    date_test_prescribed: DataTypes.DATE,
    patient_name: DataTypes.STRING,
    is_test_result_finished: DataTypes.INTEGER,
    date_imaging_prescribed:DataTypes.DATE,
    is_imaging_prescribed: DataTypes.INTEGER,
    is_imaging_result_finished: DataTypes.INTEGER,
    religion: DataTypes.STRING,
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    hmo_id: DataTypes.INTEGER,
    is_test_approved: DataTypes.INTEGER,
    is_admitted: DataTypes.INTEGER,
    obstetric_history: DataTypes.STRING,
    for_whom: DataTypes.STRING,
    has_seen_doctor: DataTypes.STRING,
    date_sent_to_doctor: DataTypes.DATE,
    test_approved_by: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    next_of_kin_name: DataTypes.STRING,
    next_of_kin_phone: DataTypes.STRING,
    next_of_kin_address: DataTypes.STRING

  },
   {
    sequelize,
    modelName: 'antenatals',
  });
  return antenatals;
};