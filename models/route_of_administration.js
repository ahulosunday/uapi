'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class route_of_administration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({dosage_form, users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(dosage_form, {foreignKey: 'dosage_form_id'})
      // define association here
    }
  }
  route_of_administration.init({
    name: DataTypes.STRING,
    dosage_form_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'route_of_administration',
  });
  return route_of_administration;
};