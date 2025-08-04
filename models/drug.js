'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      // define association here
    }
  }
  drug.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notNull: true,
        notEmpty: true,
      }
    },
    type: DataTypes.STRING,
    code: DataTypes.STRING,
    staff_id: DataTypes.STRING,
    is_available_for_nhis: DataTypes.INTEGER
   
  }, {
    sequelize,
    modelName: 'drug',
  });
  return drug;
};