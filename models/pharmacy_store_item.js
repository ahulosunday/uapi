'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pharmacy_store_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories,inventory_item }) {
       this.belongsTo(drug, {foreignKey: 'drug_id'})
       this.belongsTo(units, {foreignKey: 'unit_id'})
       this.belongsTo(route_of_administration, {foreignKey: 'route_id'})
       this.belongsTo(users, {foreignKey: 'staff_id'})
       this.belongsTo(measurement, {foreignKey: 'measurement_id'})
       this.belongsTo(dosage_form, {foreignKey: 'dosage_form_id'})
       this.belongsTo(vendor, {foreignKey: 'vendor_id'})
       this.belongsTo(inventories, {foreignKey: 'inventory_id'})
       this.belongsTo(inventory_item, {foreignKey: 'inventory_item_id'})

      // define association here
    }
  }
  pharmacy_store_item.init({
    inventory_item_id: DataTypes.INTEGER,
    drug_id: DataTypes.INTEGER,
    product_code: DataTypes.STRING,
    shelf: DataTypes.STRING,
    voucher: DataTypes.STRING,
    batch: DataTypes.STRING,
    quantity_received: DataTypes.INTEGER,
    quantity_remaining: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    unit_price: DataTypes.FLOAT,
    selling_price: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT,
    expiration: DataTypes.DATE,
    staff_id: DataTypes.INTEGER,
    date_received: DataTypes.DATE,
    drug_form: DataTypes.STRING,
    drug_type: DataTypes.STRING,
    drug_group: DataTypes.STRING,
    status: DataTypes.STRING,
    route_id: DataTypes.INTEGER,
    strength_input: DataTypes.STRING,
    measurement_id: DataTypes.INTEGER,
    dosage_form_id: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    vendor_id: DataTypes.INTEGER,
    inventory_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pharmacy_store_item',
  });
  return pharmacy_store_item;
};