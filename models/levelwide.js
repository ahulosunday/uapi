'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class levelwide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, pyrlsalary_item, salaryscale, pyrlpsdetail, pyrllevel}) {
      this.belongsTo(users, {foreignKey: 'entityid'})
      this.belongsTo( pyrlsalary_item, {foreignKey: 'psection'})
      this.belongsTo( salaryscale, {foreignKey: 'scale'})
      this.belongsTo( pyrlpsdetail, {foreignKey: 'psdetail'})
      this.belongsTo(pyrllevel, { foreignKey: 'level'})
      // define association here
    }
  }
  levelwide.init({
    psection:
    {
type: DataTypes.INTEGER,
allowNull:false,
    } ,
    psdetail:
    {
type: DataTypes.INTEGER,
allowNull:false,
    } ,
    scale:
    {
type: DataTypes.INTEGER,
allowNull:false,
    } ,
    
    level: DataTypes.INTEGER,

    entityid: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'levelwide',
  });
  return levelwide;
};