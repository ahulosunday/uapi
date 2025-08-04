'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({role, permissions}) {
      this.belongsTo(role, { foreignKey: 'roleId'})
      this.belongsTo(permissions, { foreignKey: 'permissionId'})
      // define association here
    }
  }
  role_permissions.init({
    roleId:{ type: DataTypes.INTEGER,
    allowNull:false,

    },
    permissionId:{
      type: DataTypes.INTEGER,
      allowNull:false,

    }
  }, 
 

   {
     
    sequelize,
    modelName: 'role_permissions',
    
    
  });
  return role_permissions;
};
//Before seedings==================
//ALTER TABLE `sequelize_db`.`role_permissions` ADD UNIQUE `unique_x` (`roleId`, `permissionId`);
//After seedings ==========================
//insert into `sequelize_db`.`role_permissions`(roleId, permissionId) SELECT 1, id FROM permissions;
//UPDATE `users` SET `roleid` = '1' WHERE `users`.`id` = 1;