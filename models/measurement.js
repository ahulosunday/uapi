'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, dosage_form}) {
      this.belongsTo(dosage_form, {foreignKey: 'dosage_form_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  measurement.init({
    name:{
      type: DataTypes.STRING
    },
    staff_id: DataTypes.INTEGER,
    dosage_form_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'measurement',
  });
  return measurement;
};