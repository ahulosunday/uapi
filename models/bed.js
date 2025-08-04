'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ward, users}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(ward, {foreignKey: 'ward_id'})
      // define association here
    }
  }
  bed.init({
    bed_type: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.STRING,
    staff_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bed',
  });
  return bed;
};