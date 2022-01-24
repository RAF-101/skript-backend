'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategorija extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Produkt}) {
      // define association here
      this.hasMany(Produkt, { foreignKey: 'ime', as: 'proizvod', onDelete: 'cascade', hooks: true });
    }
  }
  Kategorija.init({
    Name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
    }
  }, {
    sequelize,
    modelName: 'Kategorija',
  });
  return Kategorija;
};