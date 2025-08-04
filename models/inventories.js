'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inventories.init({
    name: DataTypes.STRING,
    refill_level: DataTypes.INTEGER,
    accepted_drug_type: DataTypes.STRING,
    desc: DataTypes.STRING,
    staff_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'inventories',
    tableName: 'inventories'
  });
  return inventories;
};