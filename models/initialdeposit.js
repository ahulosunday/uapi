'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class initialdeposit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      this.belongsTo(users, {foreignKey: 'attendedby'})
      // define association here
    }
  }
  initialdeposit.init({
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    paid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    patient_id: DataTypes.INTEGER,
    patient_type: DataTypes.STRING,
    hospital_id: DataTypes.STRING,
    editedby: DataTypes.INTEGER,
    attendedby: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'initialdeposit',
    tableName: 'initialdeposit'
  });
  return initialdeposit;
};