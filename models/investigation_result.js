'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class investigation_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({investigation_prescription,prescribed_investigation,patient,users}) {
      this.belongsTo(investigation_prescription, {foreignKey: 'investigation_prescription_id'})
      this.belongsTo(prescribed_investigation, {foreignKey: 'prescribed_investigation_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey:'staff_id'})
      // define association here
    }
  }
  investigation_result.init({
    prescribed_investigation_id: DataTypes.INTEGER,
    result: DataTypes.STRING,
    investigation_prescription_id: DataTypes.STRING,
    patient_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    comments: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'investigation_result',
  });
  return investigation_result;
};