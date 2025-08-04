'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allergy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient, visits}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id' })
      // define association here
    }
  }
  allergy.init({
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    allergen: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'allergy',
  });
  return allergy;
};