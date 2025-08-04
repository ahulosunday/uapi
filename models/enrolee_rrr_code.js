'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enrolee_rrr_code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, user_rrr}) {
      // define association here
       this.belongsTo(users,{ foreignKey: 'userId'})
        this.belongsTo(user_rrr,{ foreignKey: 'user_rrrId'})
    }
  }
  enrolee_rrr_code.init({
    user_rrrId:{
      type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notEmpty:true,
      notNull:true,

    }
    },
    userId: {
      type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notEmpty:true,
      notNull:true,

    }
    },
    code:
    {type: DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
      notEmpty:true,
      notNull:true

    }
    },

  },
 
   {
    
    
  sequelize,
  modelName: 'enrolee_rrr_code',
 
    
  });
  return enrolee_rrr_code;
};