'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class antenatal_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      // define association here
    }
  }
  antenatal_account.init({
    patient_id: DataTypes.INTEGER,
    antenatal_number: DataTypes.STRING,
    parity: DataTypes.STRING,
    gravida: DataTypes.STRING,
    last_menses_period: DataTypes.STRING,
    estimated_delivery_date: DataTypes.DATE,
    estimated_concept_time: DataTypes.DATE,
    fetal_age: DataTypes.STRING,
    medical_history: DataTypes.STRING,
    family_history: DataTypes.STRING,
    blood_transfusion_history: DataTypes.STRING,
    surgical_history: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    account_status: DataTypes.STRING,
    for_whom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'antenatal_account',
  });
  return antenatal_account;
};