'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class previous_pregnancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient, antenatal_account}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      // define association here
    }
  }
  previous_pregnancy.init({
    ante_natal_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    year: DataTypes.STRING,
    delivery_place: DataTypes.STRING,
    maturity: DataTypes.STRING,
    duration: DataTypes.STRING,
    delivery_type: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    fate: DataTypes.STRING,
    baby_type: DataTypes.STRING,
    puerperium: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    date_added: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'previous_pregnancy',
  });
  return previous_pregnancy;
};