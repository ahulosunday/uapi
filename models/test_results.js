'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient,test_prescription, users,prescribed_test }) {
      // define association here
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(test_prescription, {foreignKey: 'test_prescription_id'})
      this.belongsTo(prescribed_test, {foreignKey: 'prescribed_test_id'})
    }
  }
  test_results.init({
    prescribed_test_id: DataTypes.INTEGER,
    result: DataTypes.STRING,
    test_prescription_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    is_abnormal: DataTypes.INTEGER,
    status: DataTypes.STRING,
    comments: DataTypes.STRING,
    institute_referred: DataTypes.STRING,
    referral_reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'test_results',
  });
  return test_results;
};