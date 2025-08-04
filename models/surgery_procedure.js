'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surgery_procedure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, visits, surgery_request,users}) {
      this.belongsTo(patient,{foreignKey: 'patient_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(surgery_request, {foreignKey: 'surgery_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  surgery_procedure.init({
    patient_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    surgery_id: DataTypes.INTEGER,
    procedure: DataTypes.STRING,
    findings: DataTypes.STRING,
    post_operation_order: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'surgery_procedure',
  });
  return surgery_procedure;
};