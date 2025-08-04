'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gifship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,gifshiptype,gform, insurance }) {
      this.belongsTo(users, {foreignKey: 'userId'})
      this. belongsTo(insurance, { foreignKey: 'insurance_id'})
    }
  }
  gifship.init({
    name:{
      type:  DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     
    }
    },
    insurance_id:{
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'gifship',
  });
  return gifship;
};