'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dosage_form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'}) 
      // define association here
    }
  }
  dosage_form.init({
    name: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dosage_form',
  });
  return dosage_form;
};