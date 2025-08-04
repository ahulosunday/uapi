'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory_item_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({inventory_item, inventories, units, users,patient, drug_prescription, additional_item, visit}) {
      // define association here
    }
  }
  inventory_item_history.init({
    quantity_dispensed: DataTypes.INTEGER,
    quantity_returned: DataTypes.INTEGER,
    quantity_supplied: DataTypes.INTEGER,
    quantity_remaining: DataTypes.INTEGER,
    inventory_item_id: DataTypes.INTEGER,
    inventory_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    item_receiver: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    history_date: DataTypes.INTEGER,
    history_type: DataTypes.STRING,
    patient_id: DataTypes.INTEGER,
    drug_prescription_id: DataTypes.INTEGER,
    additional_item_id: DataTypes.INTEGER,
    visit_id: DataTypes.INTEGER,
    reason_for_return: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'inventory_item_history',
  });
  return inventory_item_history;
};