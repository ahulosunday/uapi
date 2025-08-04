'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scalewide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, pyrlsalary_item, salaryscale, pyrlpsdetail}) {
      this.belongsTo(users, {foreignKey: 'entityid'})
      this.belongsTo( pyrlsalary_item, {foreignKey: 'psection'})
      this.belongsTo( salaryscale, {foreignKey: 'scale'})
      this.belongsTo( pyrlpsdetail, {foreignKey: 'psdetail'})
      // define association here
    }
  }scalewide.init({
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
    
    

    entityid: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'scalewide',
  });
  return scalewide;
};