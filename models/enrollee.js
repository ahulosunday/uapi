'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enrollee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({hmo}) {
      this.belongsTo(hmo, {foreignKey: 'hmo_id'})
      // define association here
    }
  }
  enrollee.init({
    enrollee_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    enrolleeId: DataTypes.STRING,
    hmo_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    enrollee_type: DataTypes.STRING,
    organization: DataTypes.STRING,
    plan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'enrollee',
  });
  
  return enrollee;
};