'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.Image, {foreignKey: 'accountId', as: 'images'});
      Account.hasOne(models.AccountInformation, {foreignKey: 'accountId', as: 'personal'});
    }
  }
  Account.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    // Setting model
    sequelize,
    modelName: 'Account',
    tableName: 'accounts', // Refere to which table created
    underscored: true // when accessing table, the data use will be automatically transform to snake_case 
  });
  return Account;
};