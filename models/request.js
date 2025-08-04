'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({inventories, users, drug, inventory_item}) {
      this.belongsTo(inventories,{foreignKey: 'inventory_id'})
      this.belongsTo(inventory_item, {foreignKey: 'inventory_item_id'})
      this.belongsTo(drug, {foreignKey: 'item_id'})
      this.belongsTo(users, {foreignKey: 'requested_by'})
      // define association here
    }
  }
  request.init({
    inventory_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    inventory_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    requested_by: DataTypes.STRING,
    processed_by: DataTypes.STRING,
    date_processed: DataTypes.DATE
    
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};