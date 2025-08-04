'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class visits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient,users, service}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(service, {foreignKey: 'service_id'})
      // define association here
    }
  }
  visits.init({
    patient_id: DataTypes.INTEGER,
    date_visit_ended: DataTypes.STRING,
    time_visit: DataTypes.STRING,
    category: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    date_visit_start: DataTypes.STRING,
    department: DataTypes.STRING,
    professional: DataTypes.STRING,
    type: DataTypes.STRING,
    service_id: {
      type: DataTypes.INTEGER
    },
    vtype: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.FLOAT
    },
    status: DataTypes.STRING,
    ante_natal_id: DataTypes.STRING,
    admission_id: DataTypes.STRING,
    has_done_vitals: DataTypes.STRING,
    is_taken: DataTypes.STRING,
    immunization_id: DataTypes.STRING,
    consultation_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'visits',
  });
  return visits;
};