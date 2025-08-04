'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, service}) {
      this.belongsTo(users, {foreignKey : 'staff_id'})
      this.belongsTo(service, {foreignKey : 'service_id'})
      // define association here
    }
  }
  ward.init({
    name: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    occupant_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ward',
  });
  return ward;
};