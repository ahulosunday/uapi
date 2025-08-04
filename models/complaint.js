'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({visits, patient, users}) {
      this.belongsTo(patient, {foreignKey:'patient_id' })
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      // define association here
    }
  }
  complaint.init({
    complaint: DataTypes.STRING,
    frequency: DataTypes.STRING,
    notes: DataTypes.STRING,
    frequency_number: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    patient_insurance_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'complaint',
  });
  return complaint;
};