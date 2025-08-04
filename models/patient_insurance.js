'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient_insurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({insurance, hmo, patient,gifship, gifshiptype, gifshipPackage}) {
      this.belongsTo(insurance, {foreignKey: 'insurance_id'})
      this.belongsTo(gifship, {foreignKey: 'gifshipId' })
      this.belongsTo(gifshiptype, {foreignKey: 'gifshipTypeId'})
      this.belongsTo(gifshipPackage, {foreignKey: 'gifshipPackageId'})
      this.belongsTo(hmo, {foreignKey: 'hmo_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      // define association here
    }
  }
  patient_insurance.init({
    insurance_id: DataTypes.STRING,
    gifshipId: DataTypes.INTEGER,
    gifshipTypeId: DataTypes.INTEGER,
    gifshipPackageId: DataTypes.INTEGER,
    hmo_id: DataTypes.STRING,
    plan: DataTypes.STRING,
    enrollee_code: DataTypes.STRING,
    is_default: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    patient_id: DataTypes.STRING,
    organization: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'patient_insurance',
  });
  return patient_insurance;
};