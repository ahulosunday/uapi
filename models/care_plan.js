'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class care_plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, admission,visits, users}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(admission, {foreignKey: 'admission_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  care_plan.init({
    patient_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    evaluation: DataTypes.STRING,
    scientific_principle: DataTypes.STRING,
    nursing_objective: DataTypes.STRING,
    nursing_action: DataTypes.STRING,
    nursing_diagnosis: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'care_plan',
  });
  return care_plan;
};