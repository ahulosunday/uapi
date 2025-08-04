'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notificats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, }) {
      this.belongsTo(users, {foreignKey: 'to_', as: 'sendto'})
      this.belongsTo(users, {foreignKey: 'from_',  as: 'sendfrom'})
     
      // define association here
    }
  }
  notificats.init({
    content: DataTypes.STRING,
    items: DataTypes.STRING,
    is_read: DataTypes.INTEGER,
    title: DataTypes.STRING,
    read_at: DataTypes.STRING,
    type: DataTypes.DATE,
    from_: DataTypes.INTEGER,
    to_: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notificats',
  });
  return notificats;
};