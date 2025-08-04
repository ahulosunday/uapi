'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gifshiptype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({gifship, users, gform, insurance}) {
      // define association here
      this.belongsTo(gifship, {foreignKey: 'gifshipId'})
      this.belongsTo(users, {foreignKey: 'userId'})
      this.belongsTo(insurance, { foreignKey: 'insurance_id'})
    }
  }
  gifshiptype.init({
    name: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
      notEmpty: true,
      notNull: true,
    
    }
    
    },
    gifshipId:{
      type:DataTypes.INTEGER,
      
      allowNull:false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
    
    },
    insurance_id:{
type: DataTypes.INTEGER
    },
    userId:{
      type:DataTypes.INTEGER,
      
      allowNull:false,
      validate:{
      notEmpty: true,
      notNull: true,
     isInt:true
    }
    
    },
  }, {
    sequelize,
    modelName: 'gifshiptype',
  });
  return gifshiptype;
};