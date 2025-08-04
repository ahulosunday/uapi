'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ewallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, patient}) {
      this.belongsTo(users ,{ foreignKey: 'uid'})
      this.belongsTo(patient,{ foreignKey: 'customer_id'})
      // define association here
    }
  }
  
  ewallet.init({
    customer_id: DataTypes.INTEGER,
    narration: DataTypes.STRING,
    amt: DataTypes.FLOAT,
    vdate: DataTypes.DATE,
    bank: DataTypes.STRING,
    pmode: DataTypes.STRING,
    tablename: DataTypes.STRING,
    tableid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    posted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ewallet',
  });
  return ewallet;
};