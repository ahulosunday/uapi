'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nursing_note extends Model {
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
  nursing_note.init({
    patient_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    type_of_duty: DataTypes.STRING,
    notes: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nursing_note',
  });
  return nursing_note;
};