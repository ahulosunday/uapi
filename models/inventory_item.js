'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({inventories, drug, units, dosage_form, measurement, users, vendor}) {
      this.belongsTo(inventories, {foreignKey: 'inventory_id'})
      this.belongsTo(drug, {foreignKey: 'drug_id'})
      this.belongsTo(units, {foreignKey: 'unit_id'})
      this.belongsTo(dosage_form, {foreignKey: 'dosage_form_id'})
      this.belongsTo(measurement, {foreignKey: 'measurement_id'})
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(vendor, {foreignKey: 'vendor_id'})

      // define association here
    }
  }
  inventory_item.init({
    inventory_id: DataTypes.INTEGER,
    drug_id: DataTypes.INTEGER,
    quantity_received: DataTypes.FLOAT,
    unit_id: DataTypes.INTEGER,
    selling_price: DataTypes.FLOAT,
    acquired_price: DataTypes.FLOAT,
    expiration: DataTypes.DATE,
    quantity_consumed: DataTypes.INTEGER,
    dosage_form_id: DataTypes.INTEGER,
    measurement_id: DataTypes.INTEGER,
    strength_input: DataTypes.STRING,
    quantity_remaining: DataTypes.INTEGER,
    drug_form: DataTypes.STRING,
    drug_type: DataTypes.STRING,
    drug_group: DataTypes.STRING,
    date_received: DataTypes.DATE,
    staff_id: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    status: DataTypes.STRING,
    vendor_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'inventory_item',
  });
  return inventory_item;
};