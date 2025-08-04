'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class return_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users,inventory_item, pharmacy_store_item,drug, inventories }) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(inventory_item, {foreignKey: 'inventory_item_id'})
     this.belongsTo(pharmacy_store_item, {foreignKey: 'pharmacy_item_id'})
     this.belongsTo(drug, {foreignKey: 'drug_id'})
     this.belongsTo(inventories, {foreignKey: 'inventory_id'})
      // define association here
    }
  }
  return_item.init({
    inventory_id: DataTypes.INTEGER
            ,
    quantity: DataTypes.INTEGER,
    inventory_item_id: DataTypes.INTEGER,
    drug_id: DataTypes.INTEGER,
    pharmacy_item_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    date_received: DataTypes.DATE,
    status: DataTypes.STRING,
    reason_for_return: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'return_item',
  });
  return return_item;
};