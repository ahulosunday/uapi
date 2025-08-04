'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('role_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      roleId:{
        type: DataTypes.INTEGER,
        allowNull:false,

        references:{
          model: 'roles',
          key: 'id',

        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      permissionId:{
        type: DataTypes.INTEGER,
        allowNull:false,

        references:{
          model: 'permissions',
          key: 'id',

        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },

    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('role_permissions');
  }
};