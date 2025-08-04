'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({states, country,gifshiptype,user_rrr, lga, hospital, gform, role}) {
      //{states, country,gifshiptype,role,user_rrr}
      // define association here
      /*this.hasMany(states,{ foreignKey: 'userId'})
       this.hasMany(country,{ foreignKey: 'userId'})
      this.hasMany(gifshiptype,{ foreignKey: 'userId'})
      this.hasMany(user_rrr,{ foreignKey: 'userId'})
      this.hasMany(lga,{ foreignKey: 'userId'})
      this.hasMany(hospital,{foreignKey: 'userId'})
      this.hasMany(gform,{foreignKey: 'userId'})
      */
      this.belongsTo(role, {foreignKey: 'roleid'})

    }
    /*
    toJSON(){
      return {...this.get(),  id: undefined };

    }
    */
  }
  users.init({
    uiid:{
      type: DataTypes.STRING,
      unique: true
    
         
    },
    username:{
      type:  DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{msg: 'Username can not be empty'}
        
      }
      
    },
    password:{
      type:  DataTypes.STRING(40),
      allowNull: false,
      validate:{
        notEmpty:{msg: 'Password can not be empty'},
        notNull:true,
      } 
    },
    email:{
      type:  DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{msg: 'Email can not be empty'},
        isEmail: {msg: 'Invalid email address'},

      }
      },
      roleid:{
      type:  DataTypes.INTEGER,
      allowNull: false,
     },
     imgurl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        notEmpty:{msg: 'Image is required'},

      },
      },      
      surname:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg: 'Surname is required'},

      },
     }
     ,
      othername:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg: 'Othername is required'},

      },
     },
     
      phone:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg: 'Phone is required'},

      }
     },
     department:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg: 'Department is required'},

      }
     }
     ,
     isActive:{
      type:  DataTypes.INTEGER,
      defaultValue: false,
      allowNull: false,
      validate:{
        notEmpty:true,
        notNull:true,
       

      }
     }
     

  }, {
    sequelize,
    modelName: 'users',
    tableName: 'user'
  });
  return users;
};