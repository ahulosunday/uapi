'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescribed_drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, drug, dosage_form, route_of_administration, measurement, users, visits, inventories, pharmacy_store_item}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(drug, {foreignKey: 'drug_id'})
      this.belongsTo(route_of_administration, {foreignKey:'route_id'})
      this.belongsTo(measurement, {foreignKey: 'strength_id'})
      this.belongsTo(users, {foreignKey: 'examiner'})
      this.belongsTo(visits, {foreignKey: 'visit_id'})
      this.belongsTo(inventories, {foreignKey: 'inventory_id'})
      this.belongsTo(dosage_form, {foreignKey: 'dosage_form_id'})
       this.belongsTo(pharmacy_store_item, {foreignKey: 'pharmacy_id'})
      // define association here
    }
  }
  prescribed_drug.init({
    drug_id: DataTypes.INTEGER,
    dosage_form_id: DataTypes.INTEGER,
    drug_type: DataTypes.STRING,
    quantity_prescribed: DataTypes.INTEGER,
    quantity_to_dispense: DataTypes.STRING,
    quantity_dispensed: DataTypes.STRING,
    quantity_returned: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER,
    frequency: DataTypes.STRING,
    strength_id: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    total_price: DataTypes.FLOAT,
    dispense_status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    billing_status: DataTypes.STRING,
    examiner: DataTypes.STRING,
    date_prescribed: DataTypes.STRING,
    prescribed_strength: DataTypes.STRING,
    duration_unit: DataTypes.STRING,
    nhis_status: DataTypes.STRING,
    drug_group: DataTypes.STRING,
    visit_id: DataTypes.STRING,
    patient_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    dispensed_by: DataTypes.STRING,
    returned_by: DataTypes.STRING,
    drug_prescription_id: DataTypes.INTEGER,
    inventory_id: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    surgery_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    immunization_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,
    dosage_completed: DataTypes.STRING,
    patient_insurance_id: DataTypes.INTEGER,
    reason_for_return: DataTypes.STRING,
    drug_changed_by: DataTypes.STRING,
    nhis_drug_processed_by: DataTypes.STRING,
    date_nhis_drug_processed: DataTypes.STRING,
    date_dispensed: DataTypes.DATE,
    date_returned: DataTypes.DATE,
    original_total_price: DataTypes.FLOAT,
   permittedby: DataTypes.STRING,
   permitted_date: DataTypes.DATE,
   pharmacy_id: DataTypes.INTEGER
    
  

  }, {
    sequelize,
    modelName: 'prescribed_drug',
  });
  return prescribed_drug;
};