'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('notificats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      content: {
        type: DataTypes.STRING
      },
      items: {
        type: DataTypes.STRING
      },
      is_read: {
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      read_at: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.DATE
      },
      from_: {
        type: DataTypes.INTEGER
      },
      to_: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('notificats');
  }
};