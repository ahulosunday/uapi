'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outpts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users,{foreignKey: 'addedby'})
    }
  }
  outpts.init({
    outpt_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    tdate: DataTypes.DATE,
    addedby: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outpts',
  });
  return outpts;
};