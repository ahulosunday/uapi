'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('antenatals', {
      ante_natal_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
     
      occupation: {
        type: DataTypes.STRING
      },
    
    ancId:{ type: DataTypes.STRING},
    gravida: { type: DataTypes.STRING},
    parity:{ type: DataTypes.STRING},
    lmp:{ type: DataTypes.DATE},
    edd: { type: DataTypes.DATE},
    ecc:{ type: DataTypes.DATE},
    fetal_age:{ type: DataTypes.STRING},
    medical_history: { type: DataTypes.STRING},
    surgical_history: { type: DataTypes.STRING},
    blood_transfusion: { type: DataTypes.STRING},
    family_history: { type: DataTypes.STRING},
    staff_id: { type: DataTypes.INTEGER},
    patient_id: { type: DataTypes.INTEGER},
    dependant_id: { type: DataTypes.INTEGER},
    is_drugs_prescribed:{ type: DataTypes.INTEGER},
    antenatal_id: { type: DataTypes.INTEGER},
    date_prescribed:{ type: DataTypes.DATE},
    is_test_prescribed: { type: DataTypes.INTEGER},
    date_test_prescribed: { type: DataTypes.DATE},
    patient_name:{ type: DataTypes.STRING},
    is_test_result_finished: { type: DataTypes.INTEGER},
    date_imaging_prescribed:{ type: DataTypes.DATE},
    is_imaging_prescribed: { type: DataTypes.INTEGER},
    is_imaging_result_finished: { type: DataTypes.INTEGER},
    religion: { type: DataTypes.STRING},
    gender: { type: DataTypes.STRING},
    date_of_birth:{ type: DataTypes.DATE},
    phone:{ type: DataTypes.STRING},
    address: { type: DataTypes.STRING},
    marital_status: { type: DataTypes.STRING},
    hmo_id: { type: DataTypes.INTEGER},
    is_test_approved:{ type: DataTypes.STRING},
    is_admitted: { type: DataTypes.INTEGER},
    obstetric_history: { type: DataTypes.STRING},
    for_whom: { type: DataTypes.STRING},
    has_seen_doctor: { type: DataTypes.STRING},
    date_sent_to_doctor: { type: DataTypes.DATE},
    test_approved_by: { type: DataTypes.STRING},
    hospital_id: { type: DataTypes.STRING},
    next_of_kin_name: { type: DataTypes.STRING},
    next_of_kin_phone: { type: DataTypes.STRING},
    next_of_kin_address: { type: DataTypes.STRING},
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
    await queryInterface.dropTable('antenatals');
  }
};