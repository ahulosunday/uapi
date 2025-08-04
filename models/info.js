'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  info.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    web: DataTypes.STRING,
    smsapi: DataTypes.STRING,
    smsusername: DataTypes.STRING,
    smspassword: DataTypes.STRING,
    logo: DataTypes.STRING,
    last_update_date: DataTypes.STRING,
    short_name: DataTypes.STRING,
    watermark: DataTypes.STRING,
    token: DataTypes.STRING,
    senderid: DataTypes.STRING,
    emailpass: DataTypes.STRING,
    emailhost: DataTypes.STRING,
    emaildefault: DataTypes.STRING,
    port: DataTypes.STRING,
    email_img: DataTypes.STRING,
    http: DataTypes.STRING,
    img_path: DataTypes.STRING,
    banner: DataTypes.STRING,
    emailname: DataTypes.STRING,
    descr: DataTypes.STRING,
    ssl: DataTypes.STRING,
    wallet_ccount_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'info',
    tableName: 'info'
  });
  return info;
};