'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surgery_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, visits, service,users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient,{foreignKey: 'patient_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(service, {foreignKey: 'service_id'})
      // define association here
    }
  }
  surgery_request.init({
    patient_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    date_requested: DataTypes.DATE,
    staff_id: DataTypes.INTEGER,
    patient_insurance_id: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'surgery_request',
  });
  return surgery_request;
};