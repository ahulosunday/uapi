'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class additional_item_prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({patient, drug,users, visits, prescribed_drug, patient_insurance, inventories, antenatal_account, pharmacy_store_item}) {
      this.belongsTo(patient, {foreignKey: 'patient_id'})
      this.belongsTo(drug, {foreignKey : 'drug_id'})
      this.belongsTo(users, {foreignKey : 'examiner'})
      this.belongsTo(visits, {foreignKey : 'visit_id'})
      this.belongsTo(prescribed_drug, {foreignKey : 'prescribed_drug_id'})
      this.belongsTo(patient_insurance, {foreignKey : 'patient_insurance_id'})
      this.belongsTo(inventories, {foreignKey : 'inventory_id'})
      this.belongsTo(antenatal_account, {foreignKey : 'ante_natal_id'})
      this.belongsTo(pharmacy_store_item, {foreignKey: 'pharmacy_id'})
      
      
      // define association here
    }
  }
  additional_item_prescription.init({
    pharmacy_id: DataTypes.INTEGER,
    drug_id: DataTypes.INTEGER,
    drug_type: DataTypes.STRING,
    quantity_prescribed: DataTypes.INTEGER,
    quantity_to_dispense: DataTypes.INTEGER,
    quantity_returned: DataTypes.INTEGER,
    quantity_dispensed: DataTypes.INTEGER,
    drug_form: DataTypes.STRING,
    total_price: DataTypes.FLOAT,
    dispense_status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    billing_status: DataTypes.STRING,
    examiner: DataTypes.STRING,
    date_prescribed: DataTypes.DATE,
    visit_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    prescribed_drug_id: DataTypes.INTEGER,
    patient_insurance_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    unit_id: DataTypes.INTEGER,
    dispensed_by: DataTypes.STRING,
    returned_by: DataTypes.STRING,
    inventory_id: DataTypes.INTEGER,
    drug_prescription_id: DataTypes.INTEGER,
    ante_natal_id: DataTypes.INTEGER,
    surgery_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    nhis_status: DataTypes.STRING,
    nhis_status: DataTypes.STRING,
    reason_for_return: DataTypes.STRING,
    permittedby: DataTypes.STRING,
    permitted_date: DataTypes.DATE,
    nhis_item_processed_by: DataTypes.STRING,
    date_nhis_item_processed: DataTypes.STRING,
    date_dispensed: DataTypes.STRING,
    date_returned: DataTypes.STRING,
    original_total_price: DataTypes.FLOAT,
   permittedby: DataTypes.STRING,
   permitted_date: DataTypes.DATE

 
    
  }, {
    sequelize,
    modelName: 'additional_item_prescription'
  });
  return additional_item_prescription
};