'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class investigation_prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, users, visits, antenatal_account}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey: 'requester'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      // define association here
    }
  }
  investigation_prescription.init({
    source: DataTypes.STRING,
    requester: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    date_requested: DataTypes.DATE,
    is_billed: DataTypes.INTEGER,
    has_paid: DataTypes.INTEGER,
    status: DataTypes.STRING,
    result_notes: DataTypes.STRING,
    ante_natal_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'investigation_prescription',
  });
  return investigation_prescription;
};