'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pyrllevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, salaryscale}) {
      this.belongsTo(salaryscale, { foreignKey: 'scale'})
      this.belongsTo(users, {foreignKey: 'entityid'})
      // define association here
    }
  }
  pyrllevel.init({
    level:{
type: DataTypes.STRING,
allowNull: false,
unique: true
    } ,
    scale: DataTypes.INTEGER,
    entityid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pyrllevel',
  });
  return pyrllevel;
};