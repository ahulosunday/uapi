'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({country,states, lga, users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(country, {foreignKey: 'country_id'})
      this.belongsTo(states, {foreignKey: 'state_id'})
      this.belongsTo(lga, {foreignKey: 'lga_id'})


      // define association here
    }
  }
  patient.init({
    region: DataTypes.INTEGER,
    title: DataTypes.STRING,
    firstname: DataTypes.INTEGER,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    alt_phone: DataTypes.STRING,
    address: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    lga_id: DataTypes.INTEGER,
    hospital_id: DataTypes.STRING,
    next_of_kin_name: DataTypes.STRING,
    next_of_kin_address: DataTypes.STRING,
    next_of_kin_phone: DataTypes.STRING,
    next_of_kin_relationship: DataTypes.STRING,
    occupation: DataTypes.STRING,
    relationship_to_principal: DataTypes.STRING,
    photo: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    marital_status: DataTypes.STRING,
    religion: DataTypes.STRING,
    email: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    has_insurance: DataTypes.INTEGER,
    principal_id: DataTypes.INTEGER,
    patient_type: DataTypes.STRING,
    patient_status: DataTypes.STRING,
    complete_name: DataTypes.STRING,
    bloodtype: DataTypes.STRING,
    rhfactor: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    admitted_days_in_year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'patient',
    tableName: 'patients'
  });
  return patient;
};