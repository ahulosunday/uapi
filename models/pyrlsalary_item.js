'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pyrlsalary_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      this.belongsTo(users, {foreignKey: 'entityid'})
      // define association here
    }
  }
  pyrlsalary_item.init({
    name:
    {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    entityid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pyrlsalary_item',
  });
  return pyrlsalary_item;
};