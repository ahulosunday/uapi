'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, salaryscale, pyrllevel}) {
      this.belongsTo(salaryscale, { foreignKey: 'scale'})
      this.belongsTo(users, {foreignKey: 'entityid'})
      this.belongsTo(pyrllevel, { foreignKey: 'level'})
      // define association here
    }
  }
  step.init({
    step: 
    {
   type:   DataTypes.STRING,
   allowNull:false,
   unique:true
    }, 
    level: DataTypes.INTEGER,
    scale: DataTypes.INTEGER,
    entityid: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'step',
  });
  return step;
};