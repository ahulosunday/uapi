'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class investigation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({imaging, users}) {
      this.belongsTo(imaging, {foreignKey: 'imaging_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  investigation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notNull: true,
        notEmpty: true,
      }
    },
    price: DataTypes.FLOAT,
    nhis_price: DataTypes.FLOAT,
    phis_price: DataTypes.FLOAT,
    is_available_for_nhis: DataTypes.INTEGER,
    is_available_for_phis: DataTypes.INTEGER,
    type: DataTypes.STRING,
    imaging_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    retainership_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'investigation',
  });
  return investigation;
};