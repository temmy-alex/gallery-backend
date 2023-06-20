'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Account, {foreignKey: 'accountId', as: 'account'});
    }
  }
  Image.init({
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    slug: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    accountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    underscored: true
  });
  return Image;
};