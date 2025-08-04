'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, chart_of_account, drug, investigation, service, test}) {
      this.belongsTo(users, {foreignKey: 'userid'})
      this.belongsTo(chart_of_account,{foreignKey: 'chartofaccount_id'})
      this.belongsTo(drug,{foreignKey: 'mappingcode'})
      this.belongsTo(investigation,{foreignKey: 'mappingcode'})
        this.belongsTo(service,{foreignKey: 'mappingcode'})
       this.belongsTo(test,{foreignKey: 'mappingcode'})
  
      // define association here
    }
  }
  mapping.init({
    chartofaccount_id: DataTypes.INTEGER,
    mappingcode: DataTypes.INTEGER,
    tablename: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mapping',
  });
  return mapping;
};