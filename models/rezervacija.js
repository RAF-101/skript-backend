'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rezervacija extends Model {
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
  Rezervacija.init({
    DatumRezervacije: {
      type : DataTypes.DATE,
      allowNull: false,
      unique: false
    },
    DatumProslave: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false
    },
    Cena: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    }
  }, {
    sequelize,
    modelName: 'Rezervacija',
  });
  return Rezervacija;
};