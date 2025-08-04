'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('gforms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      idCode:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      surname:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },

      middlename:  {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      lastname:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      sex:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      dob:  {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      marital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      address:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      },
      bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
         
      },
      countryOrigin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    regionOrigin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      stateOrigin:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      },
      references:{
        model: 'states',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      
      },
      lgaOrigin:   {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'lgas',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      
    regiteredCountry: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'countries',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    regiteredRegion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'regions',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    regiteredState:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'states',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    regiteredLga: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'lgas',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    residentCountry:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'countries',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    residentRegion:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'regions',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    residentState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'states',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
    residentLga:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'lgas',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      gifshipId:   {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'gifships',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      gifshipTypeId:   {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'gifshiptypes',
        key: 'id',
        
      },
      
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
       gifshipPackageId:{
type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      },
          references:{
        model: 'gifshipPackages',
        key: 'id',
        
      },
      
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      },
      nin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      hospitalId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'hospitals',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      hmoId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      userId:   {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:true,
      references:{
        model: 'user',
        key: 'id',
        
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      validate:{
        notEmpty: true,
        notNull: true,
      }
      
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('gforms');
  }
};