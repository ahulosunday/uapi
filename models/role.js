'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, }) {
      // define association here
      //this.belongsTo(users, {foreignKey: 'userId'})
    }
  }
  role.init({
    name: {
      type:  DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate:{
      notEmpty: true,
      notNull: true,
     
    }
      
    },
    description: {
      type:  DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
      
    },
    /*
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
    }
    */
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};