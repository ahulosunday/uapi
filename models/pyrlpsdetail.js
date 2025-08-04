'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pyrlpsdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, pyrlsalary_item}) {
      this.belongsTo(users, {foreignKey: 'entityid'})
      this.belongsTo( pyrlsalary_item, {foreignKey: 'psection'})
      // define association here
    }
  }
  pyrlpsdetail.init({
    name:
    {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    entityid: DataTypes.INTEGER,
    psection: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pyrlpsdetail',
  });
  return pyrlpsdetail;
};