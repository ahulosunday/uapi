'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hmoplan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, insurance, gifship, gifshiptype, gifshipPackage, hmo}) {
      this.belongsTo(users, {foreignKey: 'staff_id'})
      this.belongsTo(insurance, {foreignKey: 'insurance_id'})
      this.belongsTo(gifship, {foreignKey: 'gifshipId' })
      this.belongsTo(gifshiptype, {foreignKey: 'gifshipTypeId'})
      this.belongsTo(gifshipPackage, {foreignKey: 'gifshipPackageId'})
      this.belongsTo(hmo, {foreignKey: 'hmo_id'})
      // define association here
    }
  }
  hmoplan.init({
    insurance_id: DataTypes.INTEGER,
    gifshipId: DataTypes.INTEGER,
    gifshipTypeId: DataTypes.INTEGER,
    gifshipPackageId: DataTypes.INTEGER,
    hmo_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    plan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hmoplan',
  });
  return hmoplan;
};