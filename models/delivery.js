'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, antenatal_account, admission, visits, users}) {
      this.belongsTo(patient,{foreignKey: 'patient_id'})
      this.belongsTo(antenatal_account, {foreignKey: 'ante_natal_id'})
      this.belongsTo(admission, {foreignKey: 'admission_id'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  delivery.init({
    patient_id: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    admission_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    condition_of_mother: DataTypes.STRING,
    condition_of_baby: DataTypes.STRING,
    mode_of_delivery: DataTypes.STRING,
    date_of_delivery: DataTypes.DATE,
    time_surgery_ended: DataTypes.DATE,
    blood_loss_quantity: DataTypes.STRING,
    apgar_one_min: DataTypes.STRING,
    apgar_five_min: DataTypes.STRING,
    apgar_ten_min: DataTypes.STRING,
    birth_weight: DataTypes.STRING,
    sex: DataTypes.STRING,
    vitaminA_IU: DataTypes.STRING,
    nature_of_liquor: DataTypes.STRING,
    nevirapine: DataTypes.STRING,
    bcg: DataTypes.STRING,
    opvo: DataTypes.STRING,
    duration: DataTypes.STRING,
    hbv: DataTypes.STRING,
    comments: DataTypes.STRING,
    baby_immunization_date: DataTypes.DATE,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'delivery',
  });
  return delivery;
};