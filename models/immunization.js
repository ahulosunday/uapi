'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class immunization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, users}) {
      this.belongsTo(users,{foreignKey: 'staff_id'})
      this.belongsTo(patient,{foreignKey: 'patient_id'})
      // define association here
    }
  }
  immunization.init({
    patient_id: DataTypes.INTEGER,
    immunization_number: DataTypes.STRING,
    mother_name: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    father_name: DataTypes.STRING,
    date_registered: DataTypes.DATE,
    at_birth: DataTypes.JSON,
    at_six_weeks: DataTypes.JSON,
    at_ten_weeks: DataTypes.JSON,
    at_fourteen_weeks: DataTypes.JSON,
    at_six_months: DataTypes.JSON,
    at_nine_months: DataTypes.JSON,
    at_one_year: DataTypes.JSON,
    at_fifteen_months: DataTypes.JSON,
    at_two_years: DataTypes.JSON,
    other_children: DataTypes.JSON,
    is_wt_less_than_2_5kg: DataTypes.STRING,
    is_baby_twin: DataTypes.INTEGER,
    is_baby_bottle_fed: DataTypes.INTEGER,
    does_family_need_support: DataTypes.INTEGER,
    are_siblings_under_weight: DataTypes.INTEGER,
    need_extra_care: DataTypes.INTEGER,
    reason_for_extra_care: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('ONGOING','COMPLETED','DISCONTINUED')
  }, {
    sequelize,
    modelName: 'immunization',
  });
  return immunization;
};